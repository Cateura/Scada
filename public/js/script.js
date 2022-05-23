
// Función para tener los datos de texto en la pantalla html

function get_text(){
    var str_host = document.getElementById("Host_name").value;
    var str_user = document.getElementById("User_name").value;
    var str_password = document.getElementById("Password").value;
    var str_DB = document.getElementById("DB_name").value;

    // alert("Value: "+ str_host + str_user + str_password + str_DB); 

}




// Enviamos al fichero de Python los datos

const { spawn } = require('child_process');

// const childPython = spawn('python', ['--version']);
// const childPython = spawn('python', ['Sayhello.py']);
// const childPython = spawn('python', ['Sayhello.py', str_host, str_user, str_password, str_DB ]);
const childPython = spawn('python', ['Sayhello.py', "str_host", "str_user", "str_password", "str_DB" ]);


//Realizamos el envío y mostramos por pantalla
childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

//Comprovamos si hay error, en caso de que sí lo haya lo mostramos por pantalla
childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});


// childPython.on('close', (code) => {
//     console.log(`child orocess exited with code ${code}`);
// });