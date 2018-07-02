var gulp = require('gulp');
var clean = require('gulp-clean');
const exec = require('child_process').exec;

gulp.task('default', ['compile-typescripts', 'clean-scripts']);

gulp.task('compile-typescripts', function (cb) {
    exec('npm run build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('clean-scripts',['compile-typescripts'], function () {
    console.log("Removing *.js.map files ...");
    return gulp.src(['lib/ir/elenoon/botplatform/*.js.map',
        'lib/ir/elenoon/botplatform/*/*.js.map',
        'lib/ir/elenoon/botplatform/*/*/*.js.map',
        'lib/ir/elenoon/botplatform/*/*/*/*.js.map'
    ], {read: false})
        .pipe(clean());

});

// gulp.watch(['src/ir/elenoon/botplatform/*.ts',
//     'src/ir/elenoon/botplatform/*/*.ts',
//     'src/ir/elenoon/botplatform/*/*/*.ts'
// ], ['clean-scripts']);
