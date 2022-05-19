if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config() //seguridad sesion
}

// Create variables for server
const express = require('express')
const Server = express()
const port = 3306
const path = `${__dirname}/Public/`
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

// Create variables for crypto users
const users = []
const bcrypt = require('bcrypt')
const initializePassport = require('./passport-config')

// Create variables for MYSQL
const mysql = require('mysql')



//--------------- AUTENTIFICACION --------------
initializePassport(
    passport, 
    name => users.find(user => user.name === name), //Encontrar el usuario que deseamos
    id => users.find(user => user.id === id) //Encontrar el usuario que deseamos
)


Server.use(express.urlencoded({extended: false})) //Podemos seleccionar el método de post, seleccionar email o usuario 
Server.use(flash())
Server.use(session({
    secret: process.env.SECRET_SESSION, //paralabra secreta para asegurar la sesion
    resave: false, // if nothing do not resave the session
    saveUninitialized: false //do not save a empty value

}))

Server.use(passport.initialize())
Server.use(passport.session())
Server.use(methodOverride('_method'))

Server.use(express.json())

//REGISTER POST
//introduce a new user
Server.post('/register',  checkNotAuthenticated,  async (request, response) =>{

    try{
        const salt = await bcrypt.genSalt() //generamos una variable diferente delante del password del usuario para generar una ref hash diferente si tenemos dos passwords iguales en nuestra base de datos
        const hashedPassword = await bcrypt.hash(request.body.password, salt) //generamos el código de hash 
        
        //introducimos el nombre de usuario y constraseña en la variable USERS
        users.push({
            id: Date.now().toString(),
            name: request.body.name, //nombre desde register website
            email: request.body.email, //email desde register website
            password: hashedPassword //pasword encriptada
        }) 
        response.redirect('/login')
        // console.log('Success!')

    }catch{
        response.redirect('/register')
        // console.log("Error!")
    }

});

//LOGIN POST
//log in a user
Server.post('/login',  checkNotAuthenticated,  passport.authenticate('local',{

    successRedirect: '/', //Si tenemos usuario y contraseña correctos que nos redirija a la pantalla home / principal
    failureRedirect: '/login', // si no es correcto el login nos envía a la pestaña de login de nuevo
    failureMessage: true, //enviamos mensaje en caso de fallo (mensaje puestos en el fichero passport-config.js)
}))

//LOGIN OUT
//log out a user
Server.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })

//CHECK AUTHENTICATION
function checkAuthenticated(req, res, next){

    if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/login')

}


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}



//--------------- SCREENS SIN AUTENTIFICACIÓN----------------------

// LOGIN HTML 
Server.get('/login', checkNotAuthenticated, function(request, response){

    // console.log(__dirname, 'main.html')
    response.sendFile(path + 'login.html')
});


//REGISTER HTML
Server.get('/register', checkNotAuthenticated, function(request, response){

    // console.log(__dirname, 'main.html')
    response.sendFile(path + 'register.html')
});




//--------------- SCREENS CON AUTENTIFICACIÓN----------------------
// MAIN HTML 
Server.get('/', checkAuthenticated, function(request, response){

    // console.log(__dirname, 'main.html')
    response.sendFile(path + 'main.html')
});


// Dashboard HTML 
Server.get('/Dashboard', checkAuthenticated, function(request, response){

    // console.log(__dirname, 'main.html')
    response.sendFile(path + '/Dashboard.html')
});


// // Database HTML
Server.get('/Database', checkAuthenticated, function(request, response){

    // console.log(__dirname, 'main.html')
    response.sendFile(__dirname + '/Database.html')
});



// -------------------------- MYSQL ---------------------

//Establecemos los prámetros de conexión con la base de datos del ordenador para obtener claves de otras máquinas y / o guardarlas
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'/*Cateura7117*/',
    database:'db_machines'
})

// Conexión a la base de datos anterior
conexion.connect(function(err){
    if (err) throw err;
  console.log("Mysql Database Connected!");
})



//Insertar datos
Server.post('/introduce_data', (req, res) => {

    let data = {host:req.body.Host_name, user:req.body.User_name, password:req.body.Password, database:req.body.DB_name}
    let sql = "INSERT INTO db_data SET ?"

    // console.log(req.body.Host_name, req.body.User_name, req.body.Password, req.body.DB_name)
    

    conexion.query(sql, data, function(err, result){
        if(err) throw err;

        res.sendFile(path + 'Database.html')                       
        
    })
})



//Mostrar todos los artículos
Server.get('/refresh', (req,res)=>{

    conexion.query('SELECT * FROM db_data', (error,data)=>{
        if(error){
            throw error
        }else{
            res.send(data)
            // res.send('Database', { title: 'Machine List', userData: data});
        }
    })
})










// -------------------------- STYLES ---------------------
Server.use(express.static('Public'))
Server.use('/Style_css', express.static(__dirname + 'Public/Style_css'))
Server.use('/JS', express.static(__dirname + 'Public/JS'))
Server.use('/IMG', express.static(__dirname + 'Public/IMG'))
Server.use('/PY', express.static(__dirname + 'Public/PY'))



// ------------ CHECK IF SOMETHING IS WRONG --------------
Server.listen(port, function(error){

    if(error){
        console.log('Something went wrong', error)
    }else{
        console.log('Server is listening on port '+ port)
    }

})






