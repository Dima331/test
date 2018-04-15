const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const cache = require('gulp-cache');           // Подключаем библиотеку кеширования
const imagemin = require('gulp-imagemin');     // Подключаем библиотеку для работы с изображениями
const pngquant = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png

const cssnano = require('gulp-cssnano');           // сжатие, удаление map в конце.
const autoprefixer = require('gulp-autoprefixer'); // autoprefixer.
const uncss = require('gulp-uncss');                 // удаление неиспользованные стили

const Stylelint = require('gulp-stylelint');
const sassGlob = require('gulp-sass-glob');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug',
        dest: 'build/assets'
    },
    styles: {
        src: 'src/sass/**/*.scss',
        dest: 'build/assets/styles/'
    },
    images: {
        src: 'src/img/**/*.*',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'build/assets/scripts/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts/'
    }

}
// создание спайта svg
function svgo() {
    return gulp.src('src/i/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))

        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))


        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite/sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('src/img'));
}

// scss
function styles() {
    return gulp.src('./src/sass/app.scss')
        .pipe(plumber())
        //.pipe(Stylelint({
        //    reporters: [
        //        { formatter: 'string', console: true }
        //    ]
        //}))
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        //.pipe(cssnano())
        //.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        //.pipe(uncss({
        //    html: ['build/**/*.html']
        //}))
        .pipe(sourcemaps.write())

        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
}

// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// очистка
function clean() {
    return del(paths.root);
}

// webpack
function scripts() {
    return gulp.src('src/js/app.js')
        .pipe(plumber())
        .pipe(eslint())
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// локальный сервер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// сжатие картинок
function images() {
    return gulp.src(paths.images.src)
        //  .pipe(cache(imagemin({
        //      interlaced: true,
        //      progressive: true,
        //      svgoPlugins: [{ removeViewBox: true }],
        //      use: [pngquant()]
        //  })))
        .pipe(gulp.dest(paths.images.dest))
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;
exports.svgo = svgo;

gulp.task('default', gulp.series(
    //clean,
    gulp.parallel(
        styles, 
        templates,
        fonts, 
        images, 
    scripts
    ),
    gulp.parallel(watch, server)
));