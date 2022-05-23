// Create variables for server
const express = require('express');
const Server = express();
const port = 5000;
const path = `${__dirname}/Public/`;


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






