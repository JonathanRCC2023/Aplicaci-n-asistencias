require("dotenv").config();

const app = require ('./server');
require('./database');
//require('./init')

app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'))
})