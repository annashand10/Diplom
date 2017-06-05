var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpNgConfig = require('gulp-ng-config');


gulp.task('default', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
})

gulp.task('config', function () {
    gulp.src('config.json')
        .pipe(gulpNgConfig('App.config',{
            environment: 'production'
        }))
        .pipe(gulp.dest('.'))
});