const docenteController = {}
const Asignatura = require('../models/Asignatura')

docenteController.renderPerfil = async (req, res)=>{
    if (!req.isAuthenticated() || req.user.rol != 1){
        res.redirect('/docentes')  
    }else{
        const asigDoc = await Asignatura.findOne({Id_docente: req.user._id }).lean();
        const usuario = {...req.user,asignatura: asigDoc}
        res.render('partials/perfil', {'docente':true, usuario:usuario} );  
    }
}


docenteController.listarDocente = async (req, res)=>{
    const docentes = await Asignatura.find().populate('Id_docente').lean()
    if (!req.isAuthenticated()){
        res.render('docente/all-docentes', {'docentes':docentes,'nadie':true})  
    }else{
        var rol = req.user.rol
        switch (rol) {
            case 1:
                res.render('docente/all-docentes', {'docentes':docentes,'docente':true});
                break;
            case 2:
                res.render('docente/all-docentes', {'docentes':docentes,'estudiante':true, 'idEstudiante': req.user._id});
                break;
            case 3:
                res.render('docente/all-docentes',{'docentes':docentes,'rer':true});
                break;
        }
    }
}

module.exports = docenteController