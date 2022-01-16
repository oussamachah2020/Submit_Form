/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const http = require('http');

const Server = http.createServer((res,req) => {
	// eslint-disable-next-line no-undef
	let filePath = path.join(__dirname,'HTML', res.url === '/' ? 'index.html' : res.url)
	
	//get the file extension
	let extname = path.extname(filePath);
	//initialize the Content Type of the file
	let ContentType = 'text/html';

	switch(extname) {
		case 'js':
			ContentType = 'text/javascript';
			break;
		case 'css':
			ContentType = 'text/css';
			break;
		case 'json':
			ContentType = 'application/json';
			break;
		case 'png':
			ContentType = 'image/png';
			break;
		case 'jpg':
			ContentType = 'image/jpg';
			break;
	}
	//read the file
	fs.readFile(filePath,(err,content) => {
		if(err) {
			if(err.code == 'ENOENT') {
				fs.readFile(path.join(__dirname,'HTML','404.html'),(err,content) => {
					req.writeHead(200, {'Content-Type': 'text/html'});
					req.end(content,'utf-8');
				})
			}else {
				//server error
				req.writeHead(500);
				req.end(`Server Error ${err.code}`);
			}
		}else {
			//success
			fs.readFile(filePath, (err, content) => {
				req.writeHead(200, {'Content-Type':ContentType});
				req.end(content,'utf-8')
			})
		}
	})
})	
const PORT = 5000;

Server.listen(PORT,() => console.log(`Server is running on port ${PORT}`))
