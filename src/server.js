const express = require('express');
var morgan = require('morgan')
const exphbs =  require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');


//Initializations
const app =  express()
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 4000) 
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs',exphbs.engine({
    dafaulLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}))

app.set('view engine', 'hbs')

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUnitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
//app.use(morgan('dev'));



//Global variables

//Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/asignatura.routes'))
app.use(require('./routes/asistencia.routes'))
app.use(require('./routes/docente.routes'))
app.use(require('./routes/estudiante.routes'))
app.use(require('./routes/representante.routes'))
app.use(require('./routes/grado.routes'))


//Static files
app.use(express.static(path.join(__dirname, '/public')))
    

module.exports = app