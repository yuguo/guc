module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        logs: {
            foo: "hello world!"
        },
		// 编译LESS
		less: {
			// 编译
			compile: {
				files: [
					{
						expand: true, //启用动态扩展
						cwd: 'css/', // css文件源的文件夹
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
						src: ['*.min.css'],
						dest: 'tmp/css',
						ext: '.css'
					}
				]
			}
		}
	});

    grunt.registerTask('logs', 'log someting', function(){
        grunt.log.write('hello world..');
    });
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('foo', 'log someting', function(){
        grunt.task.run('logs');
    });
	grunt.registerTask('default', ['logs', 'less',  'cssmin']);

	
}