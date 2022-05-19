
// // Función para tener los datos de texto en la pantalla html y guardar la nueva DB mysql de la máquina
function Save_DB_machine(){
    
    var str_host = document.getElementById("Host_name").value;
    var str_user = document.getElementById("User_name").value;
    var str_password = document.getElementById("Password").value;
    var str_DB = document.getElementById("DB_name").value;

    alert("Value: "+ str_host + str_user + str_password + str_DB);


    
    //Crear un artículo
    let data = {host:str_host, user:str_user, password:str_password, database:str_DB } //introducimos en la DB (los datos par acceder a la máquina) obtenidos de Database.html
    let sql = "INSERT INTO db_data SET (host,user,password,database)" //Texto de la Query para introducir datos en mysql
    
    conexion.query(sql, data, function(err, result){
            if(err){
                console.log("error al cargar dato") //arrojamos error si lo hubiera
            }else{              
                Object.assign(data, {id: result.insertId }) //agregamos los datos

                alert("Datos agragados!")            
                                        
            }
    })
    console.log("¡Conexión DB Mysql exitosa!")


}





//Mostrar todos los artículos
DB.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})
//Mostrar un SOLO artículo
DB.get('/api/articulos/:id', (req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (error, fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
        }
    })
})

//Crear un artículo
DB.post('/api/articulos', (req,res)=>{
    let data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock}
    let sql = "INSERT INTO articulos SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
})


//Editar articulo
DB.put('/api/articulos/:id', (req, res)=>{
    let id = req.params.id
    let descripcion = req.body.descripcion
    let precio = req.body.precio
    let stock = req.body.stock
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?"
    conexion.query(sql, [descripcion, precio, stock, id], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
})


//Eliminar articulo
DB.delete('/api/articulos/:id', (req,res)=>{
    conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
})
