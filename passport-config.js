const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByName, getUserById) {

    const authenticateUser = async (name, password, done) =>{
        const user = getUserByName(name)

        if (user == null){
            return done(null, false, {message: 'No user with that name'}) //Revisamos si existe el nombre del usuario
        }

        try {
            if (await bcrypt.compare(password, user.password)) { //Comprobamos si la contraseña está correcta con la encriptación
              return done(null, user)
            } else {
              return done(null, false, { message: 'Password incorrect' }) //mensaje de que la contraseña es incorrecta
            }
        } catch (e) {
            return done(e) //we have air here
        }

    }


    passport.use(new LocalStrategy({ usernameField: 'name'}, authenticateUser))

    passport.serializeUser((user, done)=>{ done(null, user.id)})
    passport.deserializeUser((id, done)=>{ return done(null, getUserById(id)) })
}

module.exports = initialize