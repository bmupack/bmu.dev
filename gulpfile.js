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
    sass:    ['src/css/**/*.sass', 'src/css/**/*.scss'],
    scss:    ['src/css/**/*.scss'],
    style:   ['src/css/**/*'],
    copy:    ['src/copy/*'],
    haml:    ['src/pages/**/*.haml'],
    images:  ['src/images/**/*']
};

function onerrr(arg) {
  console.log("err");
  console.log("err");
  console.log("err");
  console.log("err");
  console.log(arg);
  console.log("err");
  console.log("err");
  console.log("err");
  console.log("err");
  console.log("err");
  notify("EOOOEOEOOE")
  console.log("err");

  // body...
}
// HTML
gulp.task('haml', function () {
    gulp.src(paths.haml)
        .pipe(plumberNotifier())
        .pipe(haml({ compiler: 'visionmedia' }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

// Javascript
gulp.task("javascript", function() {
    return gulp.src('src/js/app.js')
        .pipe(plumberNotifier())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('build/js'))
        .pipe(notify("JS Bundling done."))
        .pipe(connect.reload());
});





gulp.task('sass', function () {
  return sass(paths.sass)
    .pipe(plumberNotifier())
    .on('error', sass.logError)
    .pipe(gulp.dest('build/css'))
    .pipe(notify("SASS Bundling done."))
    .pipe(connect.reload());
});

gulp.task('scss', function () {
  return sass(paths.scss)
    .pipe(plumberNotifier())
    .on('error', sass.logError)
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});


// Images
gulp.task('image', function () {
  gulp.src(paths.images)
    .pipe(plumberNotifier())
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});

// Copy
gulp.task('copy', function () {
  gulp.src(paths.copy)
    .pipe(plumberNotifier())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['javascript']);
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.images, ['image']);
    gulp.watch(paths.style, ['scss']);

});


gulp.task('webserver', function() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 8080
  });
});

gulp.task('default', ['watch', 'javascript', 'haml', 'sass', 'image', 'copy', 'webserver']);
