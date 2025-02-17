module.exports = (req, res) => {
    // Retrieve flashed error messages and previously submitted data
    const validationErrors = req.flash('validationErrors'); // now defined
    const data = req.flash('data')[0] || {}; // default to an empty object if not provided
  
    // (Optional) log the errors for debugging
    console.log(validationErrors);
  
    // Render the signup view, passing the variables to the template
    res.render('signup', { validationErrors, data });
  };
  