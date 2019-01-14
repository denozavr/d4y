var gulp = require('gulp');
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require("browser-sync").create();


var paths = {
  styles: {
    // styles/**/*.scss tells GULP to check all folders for any scss file
    src: 'styles/**/*.scss',
    // Compiled files in specified folder
    finalFile: 'styles/styles.css',
    destDev: 'styles',
    dest: 'dist'
  }

};

// Define tasks after requiring dependencies
function style() {
  // .scss files are stored in the styles folder
  return gulp
    .src(paths.styles.src)
    // Initialize sourcemaps before compilation starts
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    // Use postcss with autoprefixer and compress the compiled file using cssnano
    // .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(postcss([ autoprefixer({browsers: ['last 2 versions']}) ]))
    // Now add/write the sourcemaps
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.destDev))
    .pipe(browserSync.stream());
}

function styleMin() {
  return gulp
    .src(paths.styles.finalFile)
    .pipe(postcss([cssnano()]))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

	
// A simple task to reload the page when HTML was changed
function reload() {
  browserSync.reload();
}

function watch() {
  // // run style task before implement gulp.watch
  // style();
  // styleMin();

  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    server: {
        baseDir: "./"
    }
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    // proxy: "yourlocal.dev"
  });


  // gulp.watch takes in the location of the files to watch for changes
  // and the name of the function we want to run on change
  gulp.watch(paths.styles.src, style);
  gulp.watch(paths.styles.finalFile, styleMin);

  gulp.watch("./*.html", reload);
}

// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;
exports.min = styleMin;