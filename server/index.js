const express = require('express'); 
const cors = require('cors')
const app = express(); //create express application
const monk = require('monk'); //importing the package

app.use(cors()); //mounting the middleware function
app.use(express.json());
// app.use(monk());
const db = monk('localhost/meower');//connected
const mews = db.get('mews'); 
//gets a collection called mews
//if db or collection dont exist, 
//monk or mongo automatically create them

//this allows to get cross origin resources from other ports
//and then we need another middleware (which is built in express)
// to parse that data in proper shape
//to this server side instead of getting undefined
 //json body parser

 //when client ask GET request at /, do as followed
app.get('/', (req, res) => {

    res.json({
        message: 'Meowerolo'
    });
});

//validation check
function isValidMew(mew) {
    //if each attributes' data are not enough, return false
    // return mew.name && mew.name.toString().trim() !== '' &&
    //   mew.content && mew.content.toString().trim() !== '';
    return true;
  }

  //if client ask POST method at /mews, do as followed
app.post('/mews', (req,res) => {
    
    //if the req.body is validate
    if(isValidMew(req.body)) {
        //create an object data called mew
        const mew = {
            name: req.body.name.toString,
            content: req.body.content.toString,
            created: new Date(),
        };
        //log it out
       //console.log(mew);


       //MONGO DB INSERT
       //The insert() returns an object that contains 
       //the status of the operation.
        mews
        .insert(mew) //insert mew
        // .then(createdMew => { //this line smell weird...
        //     console.log(createdMew)}); //who knows what is createdMew and why?
        .then(createdMew => {
            console.log("i am logging");
            console.log(createdMew);
        })
        .catch(err => console.log(err));
        
    } else{ //if the data is not validate, show en error msg
        res.status(422);
        res.json({
            message: 'Hey! Name and Content are required!'

        });

    }

});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});
