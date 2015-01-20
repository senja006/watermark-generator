var
	gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	minifyCSS = require('gulp-minify-css'),
	notify = require("gulp-notify"),
	concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
    opn = require('opn'),
    jade = require('gulp-jade'),
	rename = require("gulp-rename");

gulp.task('concat', function () {
	gulp.src('./_dev/_styles/**/*.css')
		.pipe(concatCss("main.css"))
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(gulp.dest('app/css/'))
		.pipe(notify("Watch Complete!"));
});

// Компилируем Jade
gulp.task('jade', function () {
    gulp.src('_dev/_makeups/_pages/*.jade')
        .pipe(jade({pretty: true}))
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
        .pipe(notify("<%= file.relative %> Jade Complete!"))
        .pipe(gulp.dest('./app')) // Записываем собранные файлы
        .pipe(connect.reload()); // даем команду на перезагрузку страницы
});

//gulp.task('jade', function () {
//	gulp.src('./_dev/_makeups/_pages/*.html')
//	.pipe(gulp.dest('app/'))
//	.pipe(notify("Jade Complete!"))
//    .pipe(connect.reload()); // даем команду на перезагрузку страницы
//});

//gulp.task('coffee', function() {
//	gulp.src('./_dev/_scripts/_modules/*.js')
//		.pipe(concat('main.js'))
//		.pipe(gulp.dest('./js/_source/'))
//});

//gulp.task('uglify', function() {
//	gulp.src('./js/_source/main.js')
//		.pipe(uglify())
//		.pipe(rename("main.min.js"))
//		.pipe(gulp.dest('.app/js/'))
//		.pipe(notify("Scripts Optimized!"))
//        .pipe(connect.reload()); // даем команду на перезагрузку страницы
//});

//gulp.task('coffee-plugins', function() {
//	gulp.src('./_dev/_scripts/_plugins/*.js')
//		.pipe(concat('plugins.js'))
//		.pipe(gulp.dest('./js/_source/'))
//});
//
//gulp.task('uglify-plugins', function() {
//	gulp.src('./js/plugins.js')
//		.pipe(uglify())
//		.pipe(rename("plugins.min.js"))
//		.pipe(gulp.dest('.app/js/'))
//		.pipe(notify("Plugins.js Optimized!"))
//        .pipe(connect.reload()); // даем команду на перезагрузку страницы
//});

// Собираем JS
gulp.task('js', function () {
    gulp.src(['./_dev/_scripts/_modules/*.js', '!./_dev/_scripts/vendor/**/*.js'])
        .pipe(concat('main.js')) // Собираем все JS, кроме тех которые находятся в /app/js/vendor/**
        .pipe(gulp.dest('./app/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(connect.reload()); // даем команду на перезагрузку страницы
});
// собираем и минифицируем JS plugins
gulp.task('compress-plugins', function() {
    gulp.src('./_dev/_scripts/_plugins/*.js')
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('./app/js/_plugins'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js'));
});

// Копируем и минимизируем изображения
gulp.task('images', function () {
    gulp.src('./img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/img'))

});

//// css
//gulp.task('css', function () {
//    gulp.src('./_dev//styles/**/*.css')
//        .pipe()
//        .pipe(connect.reload());
//})

gulp.task('watch', function(){
	gulp.watch('_dev/_styles/**/*.css', ['concat']);
	gulp.watch('_dev/_makeups/**/*.jade', ['jade']);
	gulp.watch('_dev/_scripts/_modules/*.js', ['js', 'compress-plugins']);
	gulp.watch('_dev/_scripts/_plugins/*.js', ['compress-plugins', 'uglify-plugins']);
});

// Server
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true
    });
    opn('http://localhost:8080/');
});

// Default
gulp.task('default', ['connect', 'watch']);



