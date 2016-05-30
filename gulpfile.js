var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');


/**
 * Combine all library files into one js file.
 * 
 * @return void
 */
function cleanDist()
{
	gulp.src('./dist/*', { read: false })
		.pipe(clean());
}

gulp.task('clean-dist', cleanDist);

// ----------------------------------------------------------------------------



/**
 * Combine all library files into one js file.
 * 
 * @return void
 */
function combineLibraryFiles()
{
	gulp.src('./src/library/**/*.js')
		.pipe(concat('value-object-library.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(minify({
			ext: { min: '.min.js' }
		}))
		.pipe(gulp.dest('./dist/'));
}

gulp.task('combine-lib-files', combineLibraryFiles);

// ----------------------------------------------------------------------------

/**
 * Deploy the main file to the dist folder.
 * 
 * @return void
 */
function deployMainFile()
{
	gulp.src('./spec/value-object-spec.js')
		.pipe(jasmine());

	gulp.src('./src/value-object.js')
		.pipe(gulp.dest('./dist/'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(minify({
			ext: { min: '.min.js' }
		}))
		.pipe(gulp.dest('./dist/'));
}

gulp.task('deploy-main-file', deployMainFile);

// ----------------------------------------------------------------------------

/**
 * Minify all js files in the dist folder.
 * 
 * @return void
 */
function deploy()
{
	combineLibraryFiles();

	deployMainFile();
}

gulp.task('default', ['clean-dist'], deploy);