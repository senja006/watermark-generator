var
	gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	minifyCSS = require('gulp-minify-css'),
	notify = require("gulp-notify"),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename");

gulp.task('concat', function () {
	gulp.src('./_dev/_styles/**/*.css')
		.pipe(concatCss("main.css"))
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(gulp.dest('css/'))
		.pipe(notify("Watch Complete!"));
});

gulp.task('jade', function () {
	gulp.src('./_dev/_makeups/_pages/*.html')
	.pipe(gulp.dest('html/'))
	.pipe(notify("Jade Complete!"));
});

//gulp.task('coffee', function() {
//	gulp.src('./_dev/_scripts/_modules/*.js')
//		.pipe(concat('main.js'))
//		.pipe(gulp.dest('./js/_source/'))
//});

gulp.task('uglify', function() {
	gulp.src('./js/_source/main.js')
		.pipe(uglify())
		.pipe(rename("main.min.js"))
		.pipe(gulp.dest('./js/'))
		.pipe(notify("Scripts Optimized!"));
});

//gulp.task('coffee-plugins', function() {
//	gulp.src('./_dev/_scripts/_plugins/*.js')
//		.pipe(concat('plugins.js'))
//		.pipe(gulp.dest('./js/_source/'))
//});

gulp.task('uglify-plugins', function() {
	gulp.src('./js/plugins.js')
		.pipe(uglify())
		.pipe(rename("plugins.min.js"))
		.pipe(gulp.dest('./js/'))
		.pipe(notify("Plugins.js Optimized!"));
});


gulp.task('watch', function(){
	gulp.watch('_dev/_styles/**/*.css', ['concat']);
	gulp.watch('_dev/_makeups/**/*.html', ['jade']);
	gulp.watch('_dev/_scripts/_modules/*.js', ['coffee', 'uglify']);
	//gulp.watch('_dev/_scripts/_plugins/*.js', ['coffee-plugins', 'uglify-plugins']);
});



