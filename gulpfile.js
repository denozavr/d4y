var gulp = require("gulp");
var sass = require("gulp-sass");


var paths = {
  styles: {
    // styles/**/*.scss tells GULP to check all folders for any scss file
    src: "styles/**/*.scss",
    // Compiled files in specified folder
    dest: "dist"
  }

};

// Define tasks after requiring dependencies
function style() {
  // .scss files are stored in the styles folder
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  // run style task before implement gulp.watch
  style();

  // gulp.watch takes in the location of the files to watch for changes
  // and the name of the function we want to run on change
  gulp.watch(paths.styles.src, style);
}

// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;