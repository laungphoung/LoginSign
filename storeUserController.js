const User = require('../models/User');

module.exports = (req, res) => {
  // Validate the email field
  if (!req.body.email || req.body.email.trim() === '') {
    req.flash('validationErrors', 'Email field is required!');
    req.flash('data', req.body);
    return res.redirect('/signup');
  }

  // Validate the password field (similar validations as in your login)
  const password = req.body.password;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!password || password.trim() === '') {
    req.flash('validationErrors', 'Password field is required!');
    req.flash('data', req.body);
    return res.redirect('/signup');
  }
  if (!passwordRegex.test(password)) {
    req.flash(
      'validationErrors',
      'Password must be at least 6 characters long and contain at least one number, one uppercase letter, and one lowercase letter.'
    );
    req.flash('data', req.body);
    return res.redirect('/signup');
  }

  // Validate the confirm password field
  if (req.body.password !== req.body.confirmPassword) {
    req.flash('validationErrors', 'Confirm Password does not match Password!');
    req.flash('data', req.body);
    return res.redirect('/signup');
  }

  // Create the user in the database
  User.create(req.body)
    .then((createdUser) => {
      // Opti
      // onally, you can log the created user or redirect immediately to a success page
      console.log('User created:', createdUser);
      // Redirect to the landing page or sign-in page
      res.redirect('/');
    })
    .catch((error) => {
      console.error(error);
      req.flash('validationErrors', 'Error creating user. Please try again.');
      req.flash('data', req.body);
      res.redirect('/signup');
    });
};
