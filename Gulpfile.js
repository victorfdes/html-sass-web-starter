var gulp 			= require('gulp'),	
	autoprefixer 	= require('autoprefixer'),		// Prepare and optimize code etc
	browserSync 	= require('browser-sync').create(),
	imagemin		= require('gulp-imagemin'),
	jshint 			= require('gulp-jshint'),
	postcss 		= require('gulp-postcss'),
	sass 			= require('gulp-sass'),
	sourcemaps 		= require('gulp-sourcemaps'),	
	newer 			= require('gulp-newer'),		// Only work with new or updated files	
	
	/* ============================================================================================ */


	root 			= 'dev/',		 				// Where would you be writing your code
	dist 			= 'dist/',						// Where do you want final files to be sent at
	scss 			= root + 'sass/',
	js 				= root + 'js/',
	img 			= root + 'images/*',
	serverHost		= 'hsw';						// Add your domain here (from localhost)

	
	/* ============================================================================================ */


// CSS via Sass and Autoprefixer
gulp.task('css', function() {
	return gulp.src(scss + '*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded',					// Can be either nested, compact, expanded, compressed
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(sourcemaps.write('maps/'))
	.pipe(gulp.dest(dist + 'css/'));
});

// Optimize images through gulp-image
gulp.task('images', function() {
	return gulp.src(root + 'images/*')
	.pipe(imagemin())
	.pipe(gulp.dest(dist + 'img'));
});

// JavaScript
gulp.task('javascript', function() {
	return gulp.src([js + '*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest(dist + 'js/'));
});


// Watch everything
gulp.task('watch', function() {
	browserSync.init({ 
		open: 'external',
		proxy: serverHost,
		port: 8080
	});
	gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css']);
	gulp.watch(js + '**/*.js', ['javascript']);
	gulp.watch(img, ['images']);
	gulp.watch(root + '**/*').on('change', browserSync.reload);
});


// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);