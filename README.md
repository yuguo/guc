## Use Case 1

This is a very simple use case: compile `less` to `css`, then combine them.

1. install `node`. You can [install node at nodejs site](http://nodejs.org/)
2. install `grunt-cli` `grunt` `grunt-init`

		npm install -g grunt grunt-cli grunt-init

3. change directory to `proj-mytest-nosprite`, and install `node_modules/` by
		
		npm install

4. run `grunt`

		grunt
		
		
## Use Case 2

compile `less`, auto generate `sprite`, minimise `css`, minimise images, copy to server, and watch source file changes. If grunt watches the source file change(include `less`, `images`), it will run the flow again.

1. install `gm` and `phantomjs` inpendency for `grunt-sprite`

	* **Mac**
	
			// install GM
			brew install GraphicsMagick  

			// install Phantomjs
			brew install phantomjs
			
	* **Windows**
	
		[download and install GM](http://www.graphicsmagick.org/download.html)
				
				
		[download and install Phantomjs](http://phantomjs.org/download.html)

2. change directory to `proj-mytest`, install `mode_modules`

		npm install

3. run `grunt`

		grunt		
		
## How to add new project

`tmt` is a grunt template for front-end development, it's located at `/lib/tmt/`, every new project is initialized by `tmt`.

### Usage

The command `grunt-init /path/to/TEMPLATE` can initialize a new project based on the template. `/path/to/TEMPLATE` is relative path to the current directory.

1. Create a directory `proj-go`:

		.
		├── lib/ 
			 └──tmt/     
		└── proj-go/   
			
2. change directory to `proj-go` and run `grunt-init`:
		
		grunt-init ../lib/tmt/
	
3. follow the instruction, type in the `project name`, `description`, `author name`:

		[?] Project name (proj-go) go    
		[?] Description (The best Grunt plugin ever.) go.qq.com source code.
		[?] Author name (hellometers) meterscao

4. now we have a nice structure ready for grunt.

		proj-go/				
			├── css/			
			├── img/			
			├── slice/			
			├── html/			
			├── Gruntfile.js	
			├── package.json	
			└── .ftppass		
			