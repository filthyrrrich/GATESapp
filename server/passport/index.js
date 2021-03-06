const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const Employee = require('../database/models/employee');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	// console.log('*** serializeUser called, user: ')
	// console.log(user) // the whole raw user object!
	// console.log('---------')
	done(null, user)
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	// console.log('DeserializeUser called')
	Employee.findOne(
		{ _id: id },
		(err, user) => {
			console.log("err---->", err)
			// console.log('*** Deserialize user, user:')
			// console.log(user)
			// console.log('--------------')
			done(null, user)
		}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport