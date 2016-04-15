var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['themes/apps-for-x-blue/assets/scss/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./themes/apps-for-x-blue/assets/scss/a4g.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./themes/apps-for-x-blue/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./themes/apps-for-x-blue/assets/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

// Build the application.
gulp.task('build', ['sass'], build);
function build() {
    console.log(gutil.colors.blue.bgYellow.bold(' App built. '));
}

// Concatenate all scripts to `./www/js/app.js`.
gulp.task('scripts', scripts);
function scripts() {
    return gulp
        .src('./themes/apps-for-x-blue/assets/javascript/*.js')
        .pipe(concat('app_prod.js'))
        .pipe(gulp.dest('./themes/apps-for-x-blue/assets/javascript'));
}
