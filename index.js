const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:123@cluster0.bv0qi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Controllers
const signinController = require('./controllers/signinController');
const signupController = require('./controllers/signupController');
const landingController = require('./controllers/landingController');
const storeUserController = require('./controllers/storeUserController');
const signinPostController = require('./controllers/signinPostController');


// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fixed extended option
app.use(flash());
app.use(expressSession({
  secret: 'node secret', 
  resave: false,
  saveUninitialized: true,
}));
app.set('view engine', 'ejs');

// Routes

app.get('/', signinController);                 // GET: Render sign-in page
app.post('/user/login', signinPostController);    // POST: Process sign-in
app.get('/signup', signupController);             // GET: Render sign-up page
app.post('/user/signup', storeUserController);    // POST: Process sign-up
app.get('/landing', landingController);           // GET: Render landing page


// Start Server
app.listen(4007, () => {
  console.log("App listening on port 4007");
});
