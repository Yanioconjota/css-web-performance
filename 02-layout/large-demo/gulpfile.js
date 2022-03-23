
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');


gulp.task('styles', () => {
    return gulp.src(['styles/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minifyStyles', () => {
    return gulp.src(['styles/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', gulp.series(['styles']));
gulp.task('minify', gulp.series(['minifyStyles']));
