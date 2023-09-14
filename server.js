const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); 
const knex = require('knex');

const register = require('./controllers/register.js');
const image = require('./controllers/image.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');


const dbase = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Musa12***', 
      database : 'smartbrain'
    }
  });

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: "https://facecrypt.onrender.com",
    xContentTypeOptions: 'nosniff',
    optionsSuccessStatus: 200,
    headers: {
        "Content-Type": "application/json"
    },
    allowedHeaders: ['Content-Type', 'Authorization']
})); 
  

app.get('/', (req, res)=>{ 
    res.json(database.users); 
});

app.post('/signin', (req, res)=> signin.handleSignin(req, res, dbase, bcrypt));

app.post('/register', (req, res)=> register.handleRegister(req, res, dbase, bcrypt));


app.get('/profile/:id', (req, res)=> profile.handleProfile(req, res, dbase));

app.put('/image', (req, res) => image.handleImage(req, res, dbase));

app.post('/imageUrl', (req, res) => image.handleImageUrl(req, res));


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is listening on port ${process.env.port}`); 
});
