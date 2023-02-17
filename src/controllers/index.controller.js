const indexController = {}
const passport = require('passport')
const representante = require('../models/Representante')

indexController.renderIndex = async (req, res)=>{
    if (!req.isAuthenticated()){
        res.render('index', {'nadie':true})  
    }else{
        var rol = req.user.rol
        switch (rol) {
            case 1:
                res.redirect('index', {'docente': true});
                break;
            case 2:
                if(req.user.rol === 2){
                    id_registros =  req.user._id 
                  }else if(req.user.rol === 3 ){
                    let _representante = await representante.findOne({_id:req.user._id }).lean()
                    id_registros =  _representante.Id_Estudiante
                  }
                res.render('index', {'estudiante': true,  'idEstudiante': id_registros});
                break;
            case 3:
                res.render('index', {'estudiante': true});
                break;
        }
    }
}

indexController.loginInicio = async (req, res)=>{
    if (!req.isAuthenticated()){
        res.redirect('/')  
    }else{
        var rol = req.user.rol
        switch (rol) {
            case 1:
                res.redirect('/grados');
                break;
            case 2:
                res.redirect('/materias/:id');                
                break;
            case 3:
                res.redirect('/materias/:id');                
                break;
        }
    }
}


indexController.signin = passport.authenticate('local',{
    failureRedirect: '/',
    successRedirect: '/login'
})

indexController.cerrar = (req, res)=> {
    req.session.destroy();
    res.redirect("/");
}

module.exports = indexController
