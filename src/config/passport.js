const { Passport } = require('passport');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const docente = require('../models/Docente')
const estudiante = require('../models/Estudiante')
const representante = require('../models/Representante')
let rol = 'estudiante'
let usuario = ''

passport.use(new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, user, password, done)=>{  
    rol = req.body.xx
    if(rol == 'docente'){
        usuario = docente
    }else if(rol == 'estudiante'){
        usuario = estudiante
    }else if (rol == 'representante'){
        usuario = representante
    }
    const persona = await usuario.findOne({"Usuario":user})
    if(!persona){
        return done(null, false, {message: 'No hay ese usuario'})
    }else{
       if(persona.Contraseña == password){
        return done(null, persona)
       }else{
        return done(null, false, {message: 'contrasena incorrecta'})
       }
    }
}));

passport.serializeUser((user,done)=>{
    done(null, user._id)
})

passport.deserializeUser((id, done)=>{
    usuario.findById(id,(err, user)=>{
        done(err, user)
    })
})
