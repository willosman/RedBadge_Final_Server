require('dotenv').config()
let express = require('express');
let app = express();
let sequelize = require('./db')

let cardtype = require('./controllers/cardtypecontroller');
let card = require('./controllers/cardcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();

app.use(require('./middleware/headers'));

app.use(express.json())

app.use('/card', card);
app.use('/cardtype', cardtype);
app.use('/user', user);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
});