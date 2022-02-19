const express = require('express')
const dotenv = require('dotenv').config()
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, {useUnifiedTopology: true})


const dbSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    message:{
        type: String,
    }
})

const data = mongoose.model('data', dbSchema);

app.use(express.static(__dirname, + 'public'));

app.get('/', function (req,res){
    res.sendFile('index.html', {root: 'public'});
})


app.post('/', function(req, res) {
    let newdata = new data ({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    newdata.save().then(newdata => {
        console.log(newdata);
    })

    .catch (e => {
        console.log(e);
    })
    res.redirect('/');
})  

app.listen(3000, function (){
    console.log('Logged on site')
})
