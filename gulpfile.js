/*jshint esversion: 6*/

//подключение модулей
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

//пути к файлам начальным и к файлам назначения
const paths = {
	
	html: {
		src: 'src/*.html',
		dest: 'dist/'
	},
	styles: {
		src: 'src/sass/**/*.+(scss|sass)',
		dest: 'dist/css/'
	},
	scripts: {
		src: [
			'node_modules/jquery/dist/jquery.js',
			'node_modules/slick-carousel/slick/slick.js',
			'node_modules/mixitup/dist/mixitup.js',
			'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
			'src/js/**/*.js'
		],
		dest: 'dist/js/'
	},
	img: {
		src: 'src/img/**',
		dest: 'dist/img/'
	}
};

//очистка каталога
function cleanDir() {
	return del(['dist/*', '!dist/img']);
}

//задача для обработки стилей
function myStyles() {
	return gulp.src(paths.styles.src)
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer({
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(rename({
		basename: 'style',
		suffix: '.min'
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(size({
		showFiles: true
	}))
	.pipe(gulp.dest(paths.styles.dest))
	.pipe(browserSync.stream());
}

//задача для обработки скриптов
function myScripts() {
	return gulp.src(paths.scripts.src)
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(uglify())
	.pipe(concat('script.min.js'))
	.pipe(sourcemaps.write('.'))
	.pipe(size({
		showFiles: true
	}))
	.pipe(gulp.dest(paths.scripts.dest))
	.pipe(browserSync.stream());
}

//задача для обработки html
function myHTML() {
	return gulp.src(paths.html.src)
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(size({
		showFiles: true
	}))
	.pipe(gulp.dest(paths.html.dest))
	.pipe(browserSync.stream());
}


function imgMin() {
	return gulp.src(paths.img.src)
		.pipe(newer(paths.img.dest))
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 5
		}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.img.dest));
}


//вотчер
function watcher() {
	browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
	gulp.watch(paths.html.dest).on('change', browserSync.reload);
	gulp.watch(paths.styles.src, myStyles);
	gulp.watch(paths.scripts.src, myScripts);
	gulp.watch(paths.html.src, myHTML);
	gulp.watch(paths.img.src, imgMin);
}

const build = gulp.series(cleanDir, myHTML, gulp.parallel(myStyles, myScripts, imgMin), watcher);

exports.clean = cleanDir;
exports.styles = myStyles;
exports.scripts = myScripts;
exports.html = myHTML;
exports.imagemin = imgMin;
exports.watch = watcher;
exports.build = build;
exports.default = build;

