const gulp = require("gulp");
const sass = require("gulp-sass");
const bs = require("browser-sync");
const wait = require("gulp-wait");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");

gulp.task("serve", function(){
    bs.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch("./src/scss/**/*.scss", ["sass"]);
    gulp.watch("./src/*.html").on('change', bs.reload);
    gulp.watch("./src/js/*.js").on('change', bs.reload);
});

gulp.task("sass", function() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(wait(500))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest("./src/css"))
        .pipe(bs.stream());
});

gulp.task("imagemin", function() {
    gulp.src("./src/img-before/**/*")
    .pipe(imagemin({
        optimizationLevel: 5
    }))
    .pipe(gulp.dest("./src/img/"));
});

gulp.task("default", ["serve"]);
