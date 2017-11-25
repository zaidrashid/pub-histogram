(function() {
    'use strict';

    var gulp = require('gulp');
    var del = require('del');
    var path = require('path');
    var async = require('async');
    var inject = require('gulp-inject');
    var ngAnnotate = require('gulp-ng-annotate');
    var concat = require('gulp-concat');
    var rev = require('gulp-rev');
    var sass = require('gulp-sass');
    var csso = require('gulp-csso');

    var homePath = process.cwd();
    var config = require(path.join(homePath, 'config.json'));

    // generic methods
    function generateJsFilesInOrder() {
        var files = [];

        var moduleFiles = config.imports.modules.js;
        for (var i = 0; i < moduleFiles.length; i++) {
            files.push(path.join(config.build.module, path.basename(moduleFiles[i])));
        }

        var jsFiles = config.imports.js;
        for (i = 0; i < jsFiles.length; i++) {
            files.push(path.join(config.build.js, path.basename(jsFiles[i])));
        }

        return files;
    }

    function injectFiles(done, target, root, files) {
        gulp.src(target, {base: root})
            .pipe(inject(gulp.src(files, {read: false}), {relative: true}))
            .pipe(gulp.dest(root))
            .on('end', done);
    }

    // gulp methods
    gulp.task('clean', function() {
        var paths = [
            config.build.root,
            config.dist.root
        ];
        return del(paths, {force: true});
    });

    gulp.task('default', ['clean'], function(done) {
        async.series([
            function prepareBuild(done) {
                async.series([
                    copyIndex,
                    copyJsModuleFiles,
                    copyJsFiles,
                    injectJsFiles,
                    generateCssFiles,
                    injectCssFiles
                ], done);
            },
            function prepareDist(done) {
                async.series([
                    copyBaseFiles,
                    combineAndInjectJsFiles,
                    combineAndInjectCss
                ], done);
            }
        ]);
    });

    // build process
    function copyIndex(done) {
        gulp.src(config.src.index)
            .pipe(gulp.dest(config.build.root))
            .on('end', done);
    }

    function copyJsModuleFiles(done) {
        gulp.src(config.imports.modules.js)
            .pipe(gulp.dest(config.build.module))
            .on('end', done);
    }

    function copyJsFiles(done) {
        gulp.src(config.imports.js)
            .pipe(gulp.dest(config.build.js))
            .on('end', done);
    }

    function injectJsFiles(done) {
        var target = config.build.index;
        var root = config.build.root;
        var files = generateJsFilesInOrder();
        injectFiles(done, target, root, files);
    }

    function generateCssFiles(done) {
        gulp.src(config.src.scss)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(config.build.css))
            .on('end', done);
    }

    function injectCssFiles(done) {
        var target = config.build.index;
        var root = config.build.root;
        var files = config.build.cssFiles;
        injectFiles(done, target, root, files);
    }

    // dist process
    function copyBaseFiles(done) {
        gulp.src(config.src.index)
            .pipe(gulp.dest(config.dist.root))
            .on('end', done);
    }

    function combineAndInjectJsFiles(done) {
        var files = generateJsFilesInOrder();
        gulp.src(files)
            .pipe(ngAnnotate())
            .pipe(concat('system.js'))
            .pipe(rev())
            .pipe(gulp.dest(config.dist.root))
            .on('end', function() {
                injectFiles(done, config.dist.index, config.dist.root, config.dist.jsFiles);
            });
    }

    function combineAndInjectCss(done) {
        gulp.src(config.build.cssFiles)
            .pipe(csso())
            .pipe(concat('system.css'))
            .pipe(rev())
            .pipe(gulp.dest(config.dist.root))
            .on('end', function() {
                injectFiles(done, config.dist.index, config.dist.root, config.dist.cssFiles);
            });
    }
})();
