const estudianteController = {}
const estudiante = require('../models/Estudiante')
const representante = require('../models/Representante')

estudianteController.renderEstudiante = async (req, res)=>{
    if (!req.isAuthenticated() || req.user.rol == 1){
        res.redirect('/')  
    }else{
        if(req.user.rol === 2){
            id_registros =  req.user._id 
          }else if(req.user.rol === 3 ){
            let _representante = await representante.findOne({_id:req.user._id }).lean()
            console.log(_representante)
            id_registros =  _representante.Id_Estudiante
            console.log(id_registros)
          }
        const usuario = await estudiante.findOne({_id: id_registros}).populate('Id_Grado').lean();
        console.log(usuario)
        res.render('partials/carnet', {estudiante:true, usuario, 'idEstudiante': id_registros})
    }
}

module.exports = estudianteController