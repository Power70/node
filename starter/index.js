const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////////////////////////////////////////////////////
// FILE SYSTEM

// Doing everything in a synchronous manner
// fs = file system and it is a module and is used to read and write file

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// // Reading fro a file in node js

// const textOut = `This is what we know about the avocado: ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)

// console.log(textIn);
// console.log(textOut);

// const hello = "Hello World";
// console.log(hello);

// Doing everything in an asynchronous manner
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) =>{
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) =>{
//         console.log(data2);
//         fs.readFile('txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             // Read data2 and data3 from the file above andd write them to a test file
//             fs.writeFile('txt/test.txt',`${data2}\n${data3}`, 'utf-8', err =>{
//                 console.log('Your file was successfully written.')
//             });
//         });
//     });
//     // console.log(data);
//     // Node sees a callback function as an async function
// });
// console.log('Hello from the main thread');

////////////////////////////////////////////////////////////////
// SERVER
const replaceTemplate = (temp, product) =>{
    // tem parameter here represents each placeholder found int the template-card.html
    // the replace method accepts two parameters what you want to replace and the replacement item which in this case is the product detail in the dataObject
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic)  output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}
// In order to use the srver we have to do 2 things: First we create a server and second we start the server

// 1. Create a server: It accepte a callback function with two parameters request and response.

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// JSON.parse takes the json code which is a string and automatically turn it into javaScript 
const dataObj = JSON.parse(data);
// in dataObject we have array of all the object that is in data.json  

const server = http.createServer((req, res) =>{
    // res.end('Hello from the server')

    const pathName = req.url;

     // ##### OVERVIEW PAGE ######
    
    if (pathName == '/'|| pathName == '/overview'){
        res.writeHead(200, { 
            'Content-Type': 'text/html' 
        });
        // loop through the dataObject and replace each placeholder with the actual data from the product
        const htmlCard = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        // replace PRODUCT_CARDS in template-overview.html with htmlcard
        const output =  tempOverview.replace('{%PRODUCT_CARDS%}', htmlCard)
        res.end(output);

    // ##### PRODUCT PAGE ######

    }else if(pathName == '/product'){
        // specify the content type that is what you are sending to the browser
        res.writeHead(200, {
            'content-type':'text/html'
        })
        res.end(tempProduct);
    
     // ##### API PAGE ######
    }else if(pathName == '/api'){
            // Tell the browser we are sending back json data
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            res.end(data);
        // __direname is the directory where the script files are located

        // res.end('API Page');
    }

     // ##### PAGE NOT FOUND ######
    else{
        res.writeHead(400, {
            'content-type': 'text/html',
            'my-own-header': 'Hello from the server'
        });
        res.end('<h1>Page not found!</h1>');
    }
});
// 2. listen on the server
server.listen(8000, 'localhost', () =>{
    console.log('Server is running on http://localhost:8000');
});