const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session  = require('express-session');
const dbConnection = require('./database') ;
const MongoStore = require('connect-mongo')(session)
const routes = require("./routes/employees");
const scheduleRoutes = require('./routes/schedule');

const app = express();

const socket = require('socket.io');
const PORT = process.env.PORT || 3030;



// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'captain-kneecappin', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}
// Add routes
app.use('/user', routes);
app.use('/schedule', scheduleRoutes);

// Socket.io Setup
// const io = socket(server);
// io.on('connection', function(socket){
// 	console.log("made socket connection~~!", socket.id);
// })
// io.on('connection', (socket) => {
// 	console.log(socket.id);
// 	socket.on('SEND_MESSAGE', function(data){
//         io.emit('RECEIVE_MESSAGE', data);
// });
	const server = app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

  });
  const io = socket(server);

io.on('connection', (socket) => {
    console.log("~!---SOCKET HAS CONNECTED---!~",socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.sockets.emit('RECEIVE_MESSAGE', data);
    })
});

// io.listen(PORT)
// console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	


// Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });