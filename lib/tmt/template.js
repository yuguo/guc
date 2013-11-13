/*
 * grunt-init-gruntplugin
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'TmT项目文件模板。';

// Template-specific notes to be displayed before question prompts.
exports.notes = '要想获得更多信息请RTX联系meterscao。';

// Template-specific notes to be displayed after question prompts.
exports.after = '恭喜你，你终于是个成年人了！开整吧！';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function (grunt, init, done) {

	init.process({type: 'grunt'}, [
		// Prompt for these values.
		init.prompt('name'),
		init.prompt('description', 'The best Grunt plugin ever.'),
		init.prompt('author_name')
	], function (err, props) {
		// Set a few grunt-plugin-specific properties.
		var propsName=props.name.replace("proj-", "");
        props.name = propsName;
		props.dependencies = {
			"grunt": "*",
			"grunt-contrib-less": "*",
			"grunt-contrib-cssmin": "*",
			"grunt-hellosprite": "*",
			"grunt-pngmin": "*",
			"grunt-contrib-watch": "*",
			"grunt-contrib-copy": "*",
			"grunt-2x2x": "*",
			"grunt-ftp-deploy": "0.0.10",
			"gm": "*"
		};

		// Files to copy (and process).
		var files = init.filesToCopy(props);

		// Actually copy (and process) files.
		init.copyAndProcess(files, props, {noProcess: ['**.png', '**.jpg', 'slice/**', 'img/**']});

		// Generate package.json file.
		init.writePackageJSON('package.json', props);

		// All done!
		done();
	});

};
