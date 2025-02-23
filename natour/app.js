const express = require('express');

const app = express();

// define the routes
app.get('/', (req, res) =>{
    // send just send a string to the client but json sent and objecct
res.status(200).json({message:'Hello from the server side!', app:'Natours'});
});

const port = 3000;
app.listen(port, () =>{
    console.log(`app listening on port ${port}`);
});