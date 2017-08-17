var gulp = require('gulp'),
	gzip = require('gulp-zip'),
	minifyJS = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	minifyHTML = require('gulp-htmlmin'),
	imageMin = require('gulp-imagemin'),
	deleteFile = require('del'),
	gulpif = require('gulp-if'),
	useref = require('gulp-useref'), //解析HTML文件替换未经优化的脚本和样式表。
	browserSync = require('browser-sync').create(),
	replace = require('gulp-replace');
var argv = require('yargs').argv;
var sass = require('gulp-sass');
var Revall = require('gulp-rev-all');
var preprocess = require('gulp-preprocess');
var argv = require('minimist')(process.argv.slice(2));//获取命令行参数
var autoprefixer = require('gulp-autoprefixer');


var revall = new Revall({
	dontRenameFile: [/^\/index\.html$/g],
	dontSearchFile: [/^\/lib\**\/.*/g],
	transformFilename: function (file, hash) {
		return hash + file.path.slice(file.path.lastIndexOf('.'));
	}
});

gulp.task('+=', function () {
	return deleteFile(['build', 'dist', 'app/lib/jquery/external', 'app/lib/jquery/src']);
});

gulp.task('requirejs', ['clean'], requirejs);

gulp.task('cssRef', ['requirejs'], function () { //单独提出这块 是为了不影响图片的压缩
	return gulp.src(['build/**.html'])
		.pipe(useref())
		.pipe(gulpif('*.css', minifyCSS()))
		.pipe(gulp.dest('build'))
});


gulp.task('sass', function () {
	return gulp.src('./app/assets/css/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                '> 5%',
                'ie 9'
            ]
        }))
		.pipe(gulp.dest('./app/assets/css/scssbuild'));
});
gulp.task('sass_', function () {
	return gulp.src('./app/assets/css/scss/robotUI.scss')
		.pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                '> 5%',
                'ie 9'
            ]
        }))
		.pipe(gulp.dest('./app/assets/css'));
});
// gulp.task('concatcss', function () {
// 	return gulp.src(['app/assets/css/scssbuild/**.css'])
// 		.pipe(concat('webApp.css'))
// 		.pipe(gulp.dest('app/assets/css'))

// });
gulp.task('compress', ['requirejs', 'changeUrl'], function () {
	return gulp.src(['!build/lib/**', 'build/**'])
		.pipe(gulpif('*.js!lib/*', minifyJS()))
		.pipe(gulpif('*.css', minifyCSS()))
		.pipe(gulpif('*.html', minifyHTML({
			removeComments: true,
			collapseWhitespace: true
		})))
		.pipe(gulp.dest('build'))
});



gulp.task('copy', ['requirejs']);

gulp.task('build', ['compress'], md5);


gulp.task('changeUrl', ['clean', 'sass', 'concatcss', 'cssRef', 'copy'], function () {
	return gulp.src('build/main.js')
		.pipe(preprocess({
			context: {
				ENVIRONMENT: argv.p,
			}
		}))
		.pipe(gulp.dest('build'))
})


function md5() {
	return gulp.src('build/**')
		.pipe(revall.revision())
		.pipe(gulp.dest('merchantPlatform'))
}

function requirejs(done) {
	var r = require('requirejs');
	r.optimize({
		appDir: 'app',
		baseUrl: './',
		dir: 'build',
		optimize: 'none',
		optimizeCss: 'none',
		removeCombined: true,
		mainConfigFile: 'app/main.js',
		modules: [{
			name: "main"
		}],
		logLevel: 1
	}, function () {
		done();
	});
}
gulp.task('run', function () {
	gulp.run('sass_','sass')
	browserSync.init({
		server: 'app',
		port: 3013
	});
	gulp.watch('app/assets/css/scss/**/*.scss', ['sass','sass_']);
 gulp.watch("app/**/*.{js,html,scss}").on('change', browserSync.reload);
});


gulp.task('help', function () {
	console.log('	gulp run			         本地运行项目');
	console.log('	gulp help			         本项目gulp命令说明');
	console.log('	gulp build			         打包项目（不压缩）');
	console.log('	gulp buildzip				 构建压缩包（默认测试）');
	console.log('	gulp -p				         指定环境（默认测试环境，支持test/uat/online/dev）');
	console.log('	gulp buildzip -p test                    构建测试环境压缩包');
})
gulp.task('default', ['help']);

gulp.task('_buildZip', ['build'], function () {
	return gulp.src('merchantPlatform/**')
		.pipe(gzip('merchantPlatform.zip'))
		.pipe(gulp.dest('./'))
		.on('end',function(){
			console.log('===============================================================SUCCESS===============================================================================');
		})
})


gulp.task('buildzip', function () {
	if (argv.p) {
		if (argv.p == 'test') {
			console.log('开始构建测试环境压缩包...');
			gulp.run('_buildZip')

		} else if (argv.p == 'uat') {
			console.log('开始构建uat环境压缩包...');
			gulp.run('_buildZip')
		} else if (argv.p == 'online') {
			console.log('开始构建生产环境压缩包...');
			gulp.run('_buildZip')
		} else if (argv.p == 'dev') {
			console.log('开始构建开发环境压缩包...');
			gulp.run('_buildZip')
		} else {
			console.log('暂不支持【' + argv.p + '】环境构建，请键入正确的环境名称：test/uat/online/dev');
			console.log('需要帮助请键入：gulp help');
		}
	} else {
		console.log('请键入正确的构建命令，ex：gulp buildzip -p uat');
		console.log('需要帮助请键入：gulp help');
	}
})