var gulp = require("gulp");
var sass = require("gulp-sass");

// Define tasks after requiring dependencies
function style() {
  // .scss files are stored in the styles folder
  return (
      gulp
          .src("styles/*.scss")

          // Use sass with the files found, and log any errors
          .pipe(sass())
          .on("error", sass.logError)

          // set destination for the compiled file
          .pipe(gulp.dest("dist"))
  );
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;