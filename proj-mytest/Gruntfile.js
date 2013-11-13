module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// 编译LESS
		less: {
			// 编译
			compile: {
				files: [
					{
						expand: true, //启用动态扩展
						cwd: 'css', // css文件源的文件夹
						src: ['*.less', '!import*.less'], // 匹配规则
						dest: 'tmp/css/', //导出css和雪碧图的路径地址
						ext: '.min.css' // 导出的css名
					}
				],
				options: {
					yuicompress: true
				}
			}
		},
		// 压缩css
		cssmin: {
			min: {
				files: [
					{
						expand: true,
						cwd: 'tmp/css',
						src: ['*.sprite.css'],
						dest: 'tmp/css',
						ext: '.css'
					}
				]
			}
		},
		// 自动雪碧图
        sprite: {
			// This is are multitask, you can create multiple sprite generators buy copying all
			// object with other name, see grunt.js docs for details
			sprite: {
				files: [
					{
						expand: true, //启用动态扩展
						cwd: 'tmp/css', // css文件源的文件夹
						src: ['*.min.css'], // 匹配规则
						dest: 'tmp/', //导出css和雪碧图的路径地址
						ext: '.sprite.css' // 导出的css名
					}
				],
				// options
				options: {
					// OPTIONAL: Rendering engine: auto, canvas, gm
					'engine': 'gm',
					// OPTIONAL: Image placing algorithm: top-down, left-right, diagonal, alt-diagonal
					'algorithm': 'binary-tree'

				}
			}
		},
		copy: {
			idc: {
				files: [
					{expand: true, cwd: 'tmp/css/', src: ['*.css', '!*.sprite.css', '!*.min.css'], dest: 'publish/css/'}, // makes all src relative to cwd
					{expand: true, cwd: 'img/', src: ['**'], dest: 'publish/img/'}, // makes all src relative to cwd
					{expand: true, cwd: 'tmp/sprite/', src: ['**'], dest: 'publish/sprite/'} // makes all src relative to cwd
				]
			},
            slice: {
                files: [
                    {
                        src: ['slice/*.png'],
                        dest: 'tmp/'}, // makes all src relative to cwd
                ]
            }

		},
		watch: {
			files: 'css/*.less',
			tasks: ['less','copy:slice', 'sprite', 'cssmin', 'copy:idc', 'cleanup','pngmin']
		},
		'ftp-deploy': {
			push: {
				auth: {
					host: '119.147.200.113',
					port: 21000,
					authKey: 'lifestyle'
				},
				src: 'publish/',
				dest: 'proj-<%= pkg.name %>/',
				exclusions: ['**/.DS_Store', '**/Thumbs.db', 'tmp']
			}
		},
		pngmin: {
			compile: {
				options: {
					ext: '.png',
					force:true,
					iebug: true //IE6
				},
				files: [
					{
						src: ['publish/sprite/*.png'],
						dest: 'publish/sprite/'
					},
                    {
                        expand: true,
                        cwd: 'publish/img',
                        src: ['**/*.png'],
                        dest: 'publish/img',
                        ext: '.png'
                    }
				]
			}
		},
		_2x2x: {
			scale: {
				imgsrcdir: "slice",
				imgdesdir: "slice",
				option: {
					'overwrite' : true
				}
			}
		},
		cleanup: {
			isdebug: false
		}
	});


	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sprite');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-2x2x');


	grunt.registerTask('default', ['less','copy:slice', 'sprite', 'cssmin', 'copy:idc', 'cleanup','pngmin','watch']);
	grunt.registerTask('push', ['ftp-deploy:push']);
	grunt.registerTask('2x2x', ['_2x2x']);

	grunt.registerTask('cleanup', function () {
		if (!grunt.config.get(['cleanup', 'isdebug'])) {
			grunt.file.delete('tmp/');
			grunt.log.writeln('"tmp" directory has been deleted.');
		}
		else grunt.log.writeln('Now you are in debug mode."tmp" directory will be kept.');
	});
}