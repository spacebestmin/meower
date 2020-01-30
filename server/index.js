const express = require('express');
const cors = require('cors')
const app = express(); //express application
const monk = require('monk');

const db = monk('localhost/meower');//connected
const mews = db.get('mews'); //if db or collection dont exist, 
//monk or mongo automatically create them

app.use(cors());//this allows to get cross origin resources from other ports
//and then we need another middleware (which is built in express)
// to parse that data in proper shape
//to this server side instead of getting undefined
app.use(express.json()); //json body parser
app.get('/', (req, res) => {
    res.json({
        message: 'Meowerolo'
    });
})

function isValidMew(mew) {
    return mew.name && mew.name.toString().trim() !== '' && mew.name.toString().trim().length <= 50 &&
      mew.content && mew.content.toString().trim() !== '' && mew.content.toString().trim().length <= 140;
  }

app.post('/mew', (req,res) => {
    //console.log(req.body);

    if(isValidMew(req.body)) {
        const mew = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date(),
        };
       // console.log("created mew");

        mews
        .insert(mew)
        .then(createdMew => {
            res.json(createdMew); 
        });
        //.catch(err => res.status(400).json("error: " + err));
        
    } else{
        res.status(422);
        res.json({
            message: 'Hey! Name and Content are required!'
        });
    }
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});
