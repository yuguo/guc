
## 第一发

简单的编译less，并且压缩css

1. 安装 `node` 推荐[下载安装包](http://nodejs.org/)
2. 安装 `grunt-cli` `grunt` `grunt-init`

		npm install -g grunt grunt-cli grunt-init

3. 进入 `proj-mytest-nosprite` 安装插件到 `node_modules/` 目录
		
		npm install

4. 运行 `grunt`

		grunt
		
		
## 第二发

完整的流程：编译less，生成雪碧图，压缩css，压缩图片，同步到发布文件夹，监听。

1. 为`hellosprite`安装 `gm` 和 `phantomjs` 依赖

	* **Mac**
	
			// 安装GM图形库	
			brew install GraphicsMagick  

			// 安装 Phantomjs
			brew install phantomjs
			
	* **Windows**
	
		[下载安装GM图形库](http://www.graphicsmagick.org/download.html)
				
				
		[下载安装Phantomjs](http://phantomjs.org/download.html)			
2. 进入 `proj-mytest` 目录安装插件

		npm install

3. 运行grunt

		grunt		
		
## 第三发

`tmt` 是依照项目文件结构规范搭建的一套grunt前端开发模板，模板源文件存放在 `/lib/tmt/`，每一个新的project都由这个模板初始化，并在此基础上派生出各自的项目代码。



### 初始化模板

使用 `grunt-init /path/to/TEMPLATE` 基于任意其他目录中可用的模板创建一个项目。`/path/to/TEMPLATE` 是当前目录连接到模板文件的相对路径。

1. 根据项目文件结构规范，新建一个空的文件夹，比如一个名叫 `proj-go` 的新项目：

		.
		├── lib/ 
			 └──tmt/     
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
			