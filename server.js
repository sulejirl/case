const app = require('./app');
const port = process.env.PORT || 3001;      
var mongoose       = require('mongoose');
mongoose.Promise    =require('bluebird');

// mLab Connetion
var options ={ keepAlive: 300000, connectTimeoutMS: 30000, useNewUrlParser: true};
var mongoUri = 'mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study'
mongoose.connect(mongoUri,options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', () =>{
 console.log('Connected to adatabase')                       
});

if(!module.parent){ app.listen(port); }
console.log('Magic happens on port ' + port);