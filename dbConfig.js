// mysql://USUARIO:PASSWORD@HOST:PUERTO/NOMBRE_BD
const mongoose = require('mongoose'); //npm install mongoose

const mongoUrl = 'mongodb://127.0.0.1/pepeBot'; //creamos la conexion con la bbdd

mongoose.connect(mongoUrl, {//lo conectamos con nuestra bbdd
    useNewUrlParser: true,
    useUnifiedTopology: true
});