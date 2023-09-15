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
      host : 'dpg-ck149undorps73b8hb30-a',
      port : 5432,
      user : 'smart_brain_db_zimy_user',
      password : 'yzu3Jdg2aykERPGYGbhOnSNt44Ysc3Sn', 
      database : 'smart_brain_db_zimy'
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

app.put('/imageUrl', (req, res) => image.handleImageUrl(req, res));


app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on port ${process.env.PORT}`); 
});
