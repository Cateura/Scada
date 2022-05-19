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



Server.use(express.urlencoded({extended: false})) //Podemos seleccionar el método de post, seleccionar email o usuario 
Server.use(flash())

Server.use(methodOverride('_method'))
Server.use(express.json())



//--------------- SCREENS CON AUTENTIFICACIÓN----------------------
// MAIN HTML 
Server.get('/', function(request, response){

    response.render('main')
});


// Dashboard HTML 
Server.get('/Dashboard', function(request, response){

    response.render('Dashboard')
});


// // Database HTML
Server.get('/Database', function(request, response){

    response.render('Database', { Machine_db:""})
});




// -------------------------- STYLES ---------------------
Server.use(express.static('Public'))
Server.use('/Style_css', express.static(__dirname + 'Public/Style_css'))
Server.use('/JS', express.static(__dirname + 'Public/JS'))
Server.use('/IMG', express.static(__dirname + 'Public/IMG'))
Server.use('/PY', express.static(__dirname + 'Public/PY'))
Server.use('/views', express.static(__dirname + 'Public/views'))



// ------------ CHECK IF SOMETHING IS WRONG --------------
Server.listen(port, function(error){

    if(error){
        console.log('Something went wrong', error)
    }else{
        console.log('Server is listening on port '+ port)
    }

})






