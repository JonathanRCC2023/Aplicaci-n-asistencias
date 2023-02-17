const gradoController = {}
const aula = require('../models/Grado')
const asignatura = require('../models/Asignatura')

gradoController.getGrado= async (req, res)=>{
    if (!req.isAuthenticated() || req.user.rol != 1){
        res.redirect('/aulas')  
    }else{
        const asigDoc = await asignatura.findOne({Id_docente: req.user._id }).lean();
        const grados = await aula.find({Id_Asignatura:asigDoc._id}).populate(
            {path:'Id_Asignatura', match:{Id_docente: req.user._id}, populate:
            {path:'Id_docente'}}).lean()
        res.render('all-aulas/grados', {'grados':grados,'docente': true})
    }
}

gradoController.renderGrado = async (req, res)=>{
    const aulas = await aula.find().populate('Id_Asignatura').lean()
    if (!req.isAuthenticated()){
        res.render('all-aulas/all-aulas', {'aulas':aulas,'nadie':true})  
    }else{
        var rol = req.user.rol
        console.log(rol)
        switch (rol) {
            case 1:
                res.render('all-aulas/all-aulas', {'aulas':aulas,'docente':true});
                break;
            case 2:
                res.render('all-aulas/all-aulas', {'aulas':aulas,'estudiante':true, 'idEstudiante': req.user._id});
                break;
            case 3:
                res.render('all-aulas/all-aulas',{'aulas':aulas,'rer':true});
                break;
        }
    }
}

module.exports = gradoController