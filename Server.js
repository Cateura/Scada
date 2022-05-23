// Create variables for server
const express = require('express');
const Server = express();
const port = 5000;
const path = `${__dirname}/Public/`;

// Create variables for crypto users
const users = [];
const bcrypt = require('bcrypt');

//--------------- AUTENTIFICACION --------------
Server.use(express.json());

Server.get('/users', (request, response) => {
    response.json(users);
});

//introduce a new user
Server.post('/users', async (request, response) =>{

    try{
        const salt = await bcrypt.genSalt() //generamos una variable diferente delante del password del usuario para generar una ref hash diferente si tenemos dos passwords iguales en nuestra base de datos
        const hashedPassword = await bcrypt.hash(request.body.password, salt) //generamos el código de hash 
        const user = {name: request.body.name, password: hashedPassword} //obtenemos los datos de usuario untroducido y contraseña hash generada
        
        users.push(user) //introducimos el nombre de usuario y constraseña en la variable USERS
        response.status(201).send()

    }catch{
        response.status(500).send()
    }

});


//login a user
Server.post('/users/login', async (request, response) =>{

    const user = users.find(user => user.name = request.body.name)

    if(user == null){
        return response.status(400).send('Cannot find user') //si no hay usuario imprimimos lo siguiente
    }

    try{
        //comparamos si el password del usuario = request.body.password es el mismo que el de la tabla = user.password
        if(await bcrypt.compare(request.body.password, user.password)){
            response.send('Sucess') //Login realizado correctamente
        } else{
            response.send('Not allowed') //Login realizado correctamente
        }

    }catch{
        response.status(500).send()
    }

})

//--------------- SCREENS ----------------------

// MAIN HTML 
Server.get('/', function(request, response){

    // console.log(__dirname, 'main.html')
    response.sendFile(path + 'main.html');
});


// Dashboard HTML 
Server.get('/Dashboard', function(request, response){

    // console.log(__dirname, 'main.html')
    response.sendFile(path + '/Dashboard.html');
});


// // Database HTML
Server.get('/Database', function(request, response){

    // console.log(__dirname, 'main.html')
    response.sendFile(__dirname + '/Database.html');
});




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






