# Grunt TmT

Grunt.js是基于Node.js的自动化任务运行器。

## 开始之前

### 安装node

因为grunt是基于node的开发工具，在使用前必须安装node，最新版的node已集成了npm(node包下载和分发工具)。

推荐前往[nodejs官网下载安装](http://nodejs.org/)。


### 安装grunt grunt-cli  grunt-init

在安装完 `node`之后，可以通过 `npm` 命令来安装 `grunt`、`grunt-cli` 和 `grunt-init`。

* grunt

	grunt工具运行的核心
	
		npm install -g grunt

* grunt-cli

	grunt-cli用于命令行启动Grunt，必须作为全局模块安装：
	
		npm install -g grunt-cli

* grunt-init

	`grunt-init` 是可选的，用于以命令行新建Grunt项目模板，必须作为全局模块来安装：

		npm install -g grunt-init

**注意**：
 

1. 以上的安装目标是全局的，所以可以在任意路径下操作。三个工具可分别安装，也可一起安装：

		npm install -g grunt grunt-cli grunt-init
		
2. 你可能需要使用sudo权限或者作为超级管理员运行shell命令来执行这个操作。

## 使用Grunt

`tmt` 是依照项目文件结构规范搭建的一套grunt前端开发模板，模板源文件存放在 `/lib/tmt/`，每一个新的project都由这个模板初始化，并在此基础上派生出各自的项目代码。



### 初始化模板

使用 `grunt-init /path/to/TEMPLATE` 基于任意其他目录中可用的模板创建一个项目。`/path/to/TEMPLATE` 是当前目录连接到模板文件的相对路径。

1. 根据项目文件结构规范，新建一个空的文件夹，比如一个名叫 `proj-go` 的新项目：

		.
		├── lib/       
		└── proj-go/   
			
2. 在这个文件夹下使用 `grunt-init` 命令来初始化一个新的项目结构，比如
		
		grunt-init ../lib/tmt/
	
3. 根据提示依次输入项目的名称、简单描述和代码负责人ID

		[?] Project name (proj-go) go    
		[?] Description (The best Grunt plugin ever.) go.qq.com source code.
		[?] Author name (hellometers) meterscao

4. 输入完成之后，会在刚刚的项目文件夹里生成一套标准的文件结构

		proj-go/				
			├── css/			
			├── img/			
			├── slice/			
			├── html/			
			├── Gruntfile.js	
			├── package.json	
			└── .ftppass		
			



### 项目配置

项目配置文件 `package.json` 在初始化项目的时候已被自动生成，其中的内容也来自于上一步的输入。

	{
      "name": "go",
      "description": "go.qq.com source code.",
      "author": {
        "name": "meterscao"
      },
      "dependencies": {
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
      }
    }

`dependencies`属性中定义了 `Grunt` 和 `Grunt` 插件的依赖集。

### 安装插件

在项目的 `package.json` 文件 `dependencies`属性中定义了Grunt和Grunt插件的依赖集，使用 `npm install` 时会自动安装相关依赖。

所以，直接在项目路径下运行 `npm install` 安装所有的插件。等所有的插件安装完成之后，会在项目根目录生成一个 `node_modules` 的目录，目录中包含了所有插件的执行脚本和源码。

### 任务配置
	
在 `Gruntfile.js` 里是所有关于本项目中使用任务的定义和配置。

	module.exports = function(grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            
			// 编译less	
            less: {},
            // 压缩css
            cssmin:{}
            
            },
        });

        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-cssmin');

        grunt.registerTask('default', ['less', 'cssmin']);
                
    };

* `grunt.initConfig` 

	配置各任务的目标
	
* `grunt.loadNpmTasks`

	载入插件，对于每一个将要用到的插件都要进行声明
	
* `grunt.registerTask`

	注册别名任务


### 运行grunt

在命令行运行 `grunt` 将会执行 `default` 的任务序列，效果等同于 `grunt default`（但一般不这么做）：

	grunt
	grunt default
	
至此，一个完整的基于的`grunt`的 `TmT` 项目就已经成功地在你的电脑上运行了。

## TmT的任务流

在TmT的项目里用到了包含`less` `cssmin` `hellosprite` `watch` 等在内的大约十个插件。

### 主任务流

调用的插件并不是单独各自运行的，我们定义了一套基于适合前端开发的插件执行序列作为任务流，对于一个名叫`proj-go`项目中 `go.less`的主样式大致的执行逻辑和功能是这样的：

1. **less**
		
	对**主样式源文件**进行处理，将引用的less合并、混入以及编译  
	
	`css/go.less` --> `tmp/css/go.min.css`
	
	
2. **hellosprite**


	* 对**编译后的主样式**进行处理，收集切片序列，生成雪碧图，替换`background-image`和 加入`background-position`
	* 对有高清版本的雪碧图生成高清版雪碧图，追加媒体查询的样式代码
	* 生成图片和样式文件的时间戳

 	`tmp/css/go.min.css` --> `tmp/css/go.sprite.css` + 雪碧图
 	
 	**特别注意：**因为要使用图形处理，所以在使用前须要安装`gm`和`phantomjs`依赖

3. **cssmin**

	对**生成完碧图的样式** 进行压缩，去除空格换行，去除多余的绰号，对样式值合并和简写
	
	`tmp/css/go.sprite.css` --> `tmp/css/go.css`


4. **pngmin**

	将 `img/` 和 `tmp/sprite/` 下所有的png图片进行压缩，并将 `img/`中所有压缩完的内容同步到 `tmp/img/` 中。


5. **copy**

	将临时文件夹 `tmt/` 里的所有的内容复制到 `publish/` 发布目录
	
	`tmt/` -->  `publish/`

6. **clearup**
 
	`cleanup` 是一个自定义的任务，用来判断当前任务是否需要保留临时文件夹
	
		cleanup: {
			isdebug: true
		}

7. **watch**

	通过监听样式文件的改动，触发以上1到6的任务队列，并使任务流循环执行
	
因为将主任务流的任务序列改别名为`default`，所以运行主任务流的命令是：

	grunt 	


### 独立的任务


* **2x2x**

	检验以`@2x.png`为后缀的2倍雪碧图切片的尺寸是否合法，并生成1倍雪碧图切片
	
	执行命令：
	
		grunt 2x2x

* **ftp-deploy**

	通过读取项目根目录的 `.ftppass` 中的ftp配置信息，建立ftp连接，将 `publish/` 文件夹的内容同步到目标环境，一般地我们将`ftp-deploy` 改别名为 `push`:
	
		grunt.registerTask('push', ['ftp-deploy:push']);
	
	所以，同步文件到ftp环境的命令是
	
		grunt push

* **cleanup**

	在`initConfig` 中预置了开关，用来标识当前开发是否处于调试状态，`isdebug` 如果为 `true` 将会保留项目根目录的临时文件夹 `tmp/` ，反之，则删除：
	
		cleanup: {
			isdebug: true
		}

	执行命令：
	
		grunt cleanup

## 其它


### 更新插件

插件的开发者一般无法通知到插件的使用者当前使用的插件是否是最新版，可以先检验是否过期：

	npm outdate
	
经检测，如果有过期的插件，可以在项目根目录使用 `updata` 命令来更新所有的插件(包含插件的依赖)：

	npm update
	
	
### FTP

`.ftppass` 中的帐号和密钥信息均以明文保存，请一定注意妥善保管。


