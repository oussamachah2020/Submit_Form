/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const http = require('http');
const fs = require('fs');
const path = require('path');


const Server = http.createServer((res, req) => {
    //get the file path
    let filePath = path.join(__dirname,'HTML',res.url === '/' ? 'index.html' : res.url)
    
    //check the file extension
    let extname = path.extname(filePath);
    //initialize the content type
    let ContentType = 'text/html';
    switch(extname) {
        case '.css':
            ContentType = 'text/css';
            break;
        case '.js':
            ContentType = 'text/javascript';
            break;
        case '.json':
            ContentType = 'application/json';
            break;
        case '.jpg':
            ContentType = 'image/jpg';
            break;
        case '.png':
            ContentType = 'image/png';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname,'HTML','404.html'),(err,content) => {
                    req.writeHead(200, {'Content-Type': 'text/html'});
                    req.end(content,'utf-8');
                })
            }else {
                //Server Error
                req.writeHead(500);
                req.end(`Server Error ${err.code}`);
            }
        }else {
            fs.readFile(filePath,(err,content) => {
                req.writeHead(200, {'Content-Type': ContentType});
                req.end(content,'utf-8');
            })
        }
    })
})

const PORT = process.env.PORT || 5000;
Server.listen(PORT,() => console.log(`Server is running on port ${PORT}`));