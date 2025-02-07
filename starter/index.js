const fs = require("fs");
const http = require("http");

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
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) =>{
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) =>{
        console.log(data2);
        fs.readFile('txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            // Read data2 and data3 from the file above andd write them to a test file
            fs.writeFile('txt/test.txt',`${data2}\n${data3}`, 'utf-8', err =>{
                console.log('Your file was successfully written.')
            });
        });
    });
    // console.log(data);
    // Node sees a callback function as an async function
});
console.log('Hello from the main thread');

////////////////////////////////////////////////////////////////
// SERVER

// In order to use the srver we have to do 2 things: First we create a server and second we start the server
