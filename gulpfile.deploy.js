// Requirements
var gulp                = require('gulp');
var gutil               = require("gulp-util");
var haml                = require('gulp-haml-coffee');
var hamlt               = require("gulp-haml-templates");
var sass                = require('gulp-ruby-sass');
var uglify              = require('gulp-uglify');
var notify              = require("gulp-notify");
var webpack             = require("gulp-webpack");
var webpackConfig       = require("./webpack.config.js");
var cssnano             = require('gulp-cssnano');
var htmlmin             = require('gulp-htmlmin');
var connect             = require('gulp-connect');
var plumber             = require('gulp-plumber');
var plumberNotifier     = require('gulp-plumber-notifier');

const autoprefixer      = require('gulp-autoprefixer');
const image             = require('gulp-image');

// Paths
var paths = {
    scripts: ['src/js/**/*.js'],
    sass:    ['src/css/**/*.sass'],
    scss:    ['src/css/**/*.scss'],
    style:   ['src/css/**/*'],
    copy:    ['src/copy/*'],
    haml:    ['src/pages/**/*.haml'],
    images:  ['src/images/**/*']
};

// HTML
gulp.task('haml', function () {
    gulp.src(paths.haml)
        .pipe(haml())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
});

// Javascript
gulp.task("javascript", function() {
      // return gulp.src('src/js/app.js')
      //     .pipe(webpack(webpackConfig))
      //     .pipe(gulp.dest('build/js'))
      //     .pipe(notify("Bundling done."));
});

// // Sass
// gulp.task('sass', function () {
//     gulp.src(paths.sass)
//         .pipe(sass({ indentedSyntax: true }).on('error', sass.logError))
//         .pipe(gulp.dest('build/css'));
// });
// // Scss
// gulp.task('scss', function () {
//     gulp.src(paths.scss)
//         .pipe(sass({ indentedSyntax: true }).on('error', sass.logError))
//         .pipe(gulp.dest('build/css/'));
// });
gulp.task('sass', function () {
  return sass(paths.sass)
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'));
});

gulp.task('scss', function () {
  return sass(paths.scss)
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'));
});




// Images
gulp.task('image', function () {
  gulp.src(paths.images)
    .pipe(image())
    .pipe(gulp.dest('build/images'));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['javascript']);
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.style, ['scss']);
});

// Copy
gulp.task('copy', function () {
  gulp.src(paths.copy)
    .pipe(gulp.dest('build/'));
});


// Default task
gulp.task('default', ['javascript', 'haml', 'sass', 'scss', 'image', 'copy']);
