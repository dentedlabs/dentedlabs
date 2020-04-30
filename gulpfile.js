// Gulpfile
"use strict";

const gulp                   = require('gulp');
const sass                   = require('gulp-sass');
const changed                = require('gulp-changed');
const autoprefixer           = require('gulp-autoprefixer');
const rename                 = require('gulp-rename');
const del                    = require('del');
const concat                 = require('gulp-concat');
const cleanCSS               = require('gulp-clean-css');
const uglify                 = require('gulp-uglify-es').default;
const cache                  = require('gulp-cache');
const fileinclude            = require('gulp-file-include');
const browsersync            = require('browser-sync').create();

// ====================
// ===== FOR LIVE =====
// ====================
// Gulp plumber error handler - displays if any error occurs during the process on your command
function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}

// SASS - Compile SASS files into CSS
function scss() {
  return gulp
    .src('./assets/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./assets/css/'))
    .on('error', sass.logError)
    .pipe(autoprefixer([
        "last 1 major version",
        ">= 1%",
        "Chrome >= 45",
        "Firefox >= 38",
        "Edge >= 12",
        "Explorer >= 10",
        "iOS >= 9",
        "Safari >= 9",
        "Android >= 4.4",
        "Opera >= 30"], { cascade: true }))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(browsersync.stream());
}

// BrowserSync (live reload) - keeps multiple browsers & devices in sync when building websites
function browserSync(done) {
  browsersync.init({
    files: "./*.html",
    startPath: "./html/landings/",
    server: {
      baseDir: "./",
      routes: {},
      middleware: function (req, res, next) {
        if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
          console.log('[POST => GET] : ' + req.url);
          req.method = 'GET';
        }
        next();
      }
    }
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Gulp Watch and Tasks
function watch() {
  gulp.watch('./assets/scss/**/*.scss', scss);
  gulp.watch(
    [
      './html/**/*.html',
      // './snippets/**/*.html',
      // './documentation/**/*.html'
    ],
    gulp.series(browserSyncReload)
  );
  gulp.watch('./snippets/partials/**/*.html', fileInclude);
  // gulp.watch('./documentation/partials/**/*.html', fileIncludeDocs);
}

// File Include
function fileInclude() {
  return gulp
    .src(['./snippets/partials/src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(gulp.dest('./snippets/'))
    .pipe(browsersync.stream());
};

function fileIncludeDocs() {
  return gulp
    .src(['./documentation/partials/src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(gulp.dest('./documentation/'))
    .pipe(browsersync.stream());
};

// Gulp Live Tasks
gulp.task('default', gulp.parallel(watch, scss, browserSync));
// gulp.task('default', gulp.parallel(watch, scss, browserSync, fileInclude, fileIncludeDocs));
// gulp.task('fileInclude', fileInclude);
// gulp.task('fileIncludeDocs', fileIncludeDocs);


// ====================
// ===== FOR DIST =====
// ====================
// CSS minifier - merges and minifies the below given list of Space libraries into one theme.min.css
function minCSS() {
  return gulp
    .src([
      './assets/css/theme.css',
    ])
    .pipe(cleanCSS({compatibility: 'ie11'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./docs/assets/css/'));
}

// JavaSript minifier - merges and minifies the below given list of Space libraries into one theme.min.js
function minJS() {
  return gulp
    .src([
      './assets/js/hs.core.js',
      './assets/js/hs.chartjs.js',
      './assets/js/hs.circles.js',
      './assets/js/hs.clipboard.js',
      './assets/js/hs.countdown.js',
      './assets/js/hs.cubeportfolio.js',
      './assets/js/hs.datatables.js',
      './assets/js/hs.dropzone.js',
      './assets/js/hs.fancybox.js',
      './assets/js/hs.flatpickr.js',
      './assets/js/hs.ion-range-slider.js',
      './assets/js/hs.leaflet.js',
      './assets/js/hs.pwstrength.js',
      './assets/js/hs.selectpicker.js',
      './assets/js/hs.slick-carousel.js',
      './assets/js/hs.summernote-editor.js',
      './assets/js/hs.tagify.js',
      './assets/js/hs.validation.js',
      './assets/js/theme-custom.js',
    ])
    .pipe(concat('theme.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/assets/js/'));
}

// // Copy Vendors - a utility to copy client-side dependencies into a folder
function copyVendors() {
  return gulp
    .src([
      './node_modules/*aos/**/*',
      './node_modules/*bootstrap/**/*',
      './node_modules/*bootstrap-select/**/*',
      './node_modules/*chart.js/**/*',
      './node_modules/*clipboard/**/*',
      './node_modules/*datatables/**/*',
      './node_modules/*dropzone/**/*',
      './node_modules/*flag-icon-css/**/*',
      './node_modules/*flatpickr/**/*',
      './node_modules/*ion-rangeslider/**/*',
      './node_modules/*jquery/**/*',
      './node_modules/*jquery-countdown/**/*',
      './node_modules/*jquery-migrate/**/*',
      './node_modules/*jquery-validation/**/*',
      './node_modules/*leaflet/**/*',
      './node_modules/*popper.js/**/*',
      './node_modules/*pwstrength-bootstrap/**/*',
      './node_modules/*slick-carousel/**/*',
      './node_modules/*summernote/**/*',
      './node_modules/*tagify/**/*',
      './node_modules/*typed.js/**/*',
    ])
    .pipe(gulp.dest('./docs/assets/vendor/'))
};

// Copy Vendors - copy theme specific vendors that is not not public available online
function copyHSVendors() {
  return gulp
    .src([
      './assets/vendor/*hs-counter/**/*',
      './assets/vendor/*hs-file-attach/**/*',
      './assets/vendor/*hs-go-to/**/*',
      './assets/vendor/*hs-header/**/*',
      './assets/vendor/*hs-header-fullscreen/**/*',
      './assets/vendor/*hs-mega-menu/**/*',
      './assets/vendor/*hs-megamenu/**/*',
      './assets/vendor/*hs-progress-bar/**/*',
      './assets/vendor/*hs-quantity-counter/**/*',
      './assets/vendor/*hs-scroll-nav/**/*',
      './assets/vendor/*hs-scroll-to-in-overflowed-container/**/*',
      './assets/vendor/*hs-show-animation/**/*',
      './assets/vendor/*hs-step-form/**/*',
      './assets/vendor/*hs-sticky-block/**/*',
      './assets/vendor/*hs-switch/**/*',
      './assets/vendor/*hs-toggle-state/**/*',
      './assets/vendor/*hs-toggle-switch/**/*',
      './assets/vendor/*hs-unfold/**/*',
      './assets/vendor/*hs-video-bg/**/*',
      './assets/vendor/*hs-video-player/**/*',
    ])
    .pipe(gulp.dest('./docs/assets/vendor/'))
}

// Copy Vendors - no substitute - copy vendors that does not have substitute
function copyNoSubVendors() {
  return gulp
    .src([
      './assets/vendor/*chart.js.extensions/**/*',
      './assets/vendor/*circles/**/*',
      './assets/vendor/*cubeportfolio/**/*',
      './assets/vendor/*dzsparallaxer/**/*',
      './assets/vendor/appear.js',
      './assets/vendor/polifills.js',
    ])
    .pipe(gulp.dest('./docs/assets/vendor/'))
}

// Copy Vendors - tagify - rename @yaireo/tagify to tagify
function copyTagify() {
  return gulp
    .src([
      './node_modules/@yaireo/tagify/**/*',
    ])
    .pipe(gulp.dest('./docs/assets/vendor/tagify'))
};

// Copy Vendors - fancybox - rename @fancyapps/fancybox to fancybox
function copyFancybox() {
  return gulp
    .src([
      './node_modules/@fancyapps/fancybox/**/*',
    ])
    .pipe(gulp.dest('./docs/assets/vendor/fancybox'))
};

// Copy Vendors - font-awesome - rename @fortawesome/fontawesome-free to font-awesome
function copyFontAwesome() {
  return gulp
    .src([
      './node_modules/@fortawesome/fontawesome-free/**/*',
    ])
    .pipe(gulp.dest('./docs/assets/vendor/font-awesome'))
};

// Copy SVG
function copySVG() {
  return gulp
    .src([
      './assets/svg/**/*',
    ])
    .pipe(gulp.dest('./docs/assets/svg/'))
};

// Gulp Dist Tasks
gulp.task('minCSS', minCSS);
gulp.task('minJS', minJS);
gulp.task('copyVendors', copyVendors);
gulp.task('copyHSVendors', copyHSVendors);
gulp.task('copyNoSubVendors', copyNoSubVendors);
gulp.task('copyTagify', copyTagify);
gulp.task('copyFancybox', copyFancybox);
gulp.task('copyFontAwesome', copyFontAwesome);
gulp.task('copySVG', copySVG);
gulp.task('dist', gulp.series(minCSS, minJS, copyVendors, copyHSVendors, copyNoSubVendors, copyTagify, copyFancybox, copyFontAwesome, copySVG));
