const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output= output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    if(!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');   
    }
    return output;
}

const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    const htmlcard = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', htmlcard)

    if(pathname === '/overview' || pathname === '/'){
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        res.end(output);
    }else if (pathname === '/product'){
        res.writeHead(200, {
            'content-type':'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    } else if (pathname === '/api'){
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(data);
    } else{
        res.writeHead(400, {
            'content-type': 'text/html',
            'my-own-header': 'Hello from the server'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on http://localhost port 3000');
}); 
