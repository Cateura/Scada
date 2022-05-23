// Create variables for server
const express = require('express');
const app = express();
const port = 5000;
const path = require("path");

// Settings
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs')


//--------------- SCREENS ----------------------

// Public
app.use(express.static('public'))

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/scada"));
app.use(require("./routes/database"));



// ------------ CHECK IF SOMETHING IS WRONG --------------
app.listen(port, function(error){

    if(error){
        console.log('Something went wrong', error)
    }else{
        console.log('Server is listening on port '+ port)
    }

})






