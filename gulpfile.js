var gulp = require('gulp');
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  order = require('gulp-order'),
  browserSync = require("browser-sync").create();


var paths = {
  styles: {
    // styles/**/*.scss tells GULP to check all folders for any scss file
    src: 'styles/**/*.scss',
    // Compiled files in specified folder
    finalFile: 'styles/styles.css',
    destDev: 'styles',
    dest: 'dist',
    root: './'
  },
  js: {
    src: 'js/*.js',
    finalFile: 'js/scripts.js',
    destDev: 'js/all',
    root: './'
  }
};

function scripts() {
  return gulp.src(paths.js.src)
      .pipe(order([
        'js/lazysizes.min.js',
        'js/modal.js',
        'js/numbers.js',
        'js/loadjs.min.js',
        'js/intersection-observer.min.js',
        'js/map.lazy.js',
        'js/sendEmail.js',
        'js/emailjs.min.js',
        'js/sweetalert2.all.min.js'
      ], { base: __dirname }))
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(paths.js.destDev)) // moved concat. file to js/all because if in the same folder on every new task execution the all js files appened in script.js
      .pipe(rename('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(paths.js.root));
}

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
    .pipe(gulp.dest(paths.styles.destDev));
    // .pipe(browserSync.stream());
}

function styleMin() {
  return gulp
    .src(paths.styles.finalFile)
    .pipe(postcss([cssnano()]))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(paths.styles.root));
}


// A simple task to reload the page when HTML was changed
function reload() {
  browserSync.reload();
}

function watch() {
  // run style task before implement gulp.watch
  // style();
  // styleMin();

  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    files: [ './styles/**.*','./*.html' ],
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

  gulp.watch(paths.js.src, scripts);

  // gulp.watch("./*.html", reload);
}

// Don't forget to expose the task!
exports.watch = watch;

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;
exports.min = styleMin;

//JS
exports.scripts = scripts;
