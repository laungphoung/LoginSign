const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    // Normalize input values
    const emailInput = req.body.email ? req.body.email.trim() : "";
    const passwordInput = req.body.password ? req.body.password.trim() : "";

    // Validate the Email field
    if (!emailInput) {
      req.flash('validationErrors', 'Email field is required.');
      req.flash('data', req.body);
      return res.redirect('/');
    }

    // Validate the Password field is not empty
    if (!passwordInput) {
      req.flash('validationErrors', 'Password field is required.');
      req.flash('data', req.body);
      return res.redirect('/');
    }

    // Validate the Password format:
    // Must be at least 6 characters long and contain at least one number, one uppercase letter, and one lowercase letter.
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(passwordInput)) {
      req.flash(
        'validationErrors',
        'Password must be at least 6 characters long and contain at least one number, one uppercase letter, and one lowercase letter.'
      );
      req.flash('data', req.body);
      return res.redirect('/');
    }

    // Find the user by email using a case-insensitive query
    const user = await User.findOne({ 
      email: { $regex: '^' + emailInput + '$', $options: 'i' }
    });
    console.log("User found:", user);

    // If no user exists or the password doesn't match, flash error
    if (!user || user.password !== passwordInput) {
      req.flash('validationErrors', 'Invalid Email or Password.');
      req.flash('data', req.body);
      return res.redirect('/');
    }

    // If credentials are valid, generate an access token.
    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    
    // Store the access token in a browser cookie (httpOnly for security)
    res.cookie('accessToken', token, { httpOnly: true });
    
    console.log("Login successful, redirecting to landing page");
    return res.redirect('/landing');
  } catch (error) {
    console.error("Error in login controller:", error);
    req.flash('validationErrors', 'An error occurred, please try again.');
    return res.redirect('/');
  }
};
