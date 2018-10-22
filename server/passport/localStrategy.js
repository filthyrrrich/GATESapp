const Employee = require('../database/models/employee');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		Employee.findOne({ username: username }, (err, user) => {
			console.log('Find User:', user);
			if (err) {
				return done(err)
			}
			if (!user) {
				console.log("No user!!!!!!");
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy