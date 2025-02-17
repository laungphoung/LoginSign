module.exports = (req, res) => {
    const validationErrors = req.flash('validationErrors');
    const data = req.flash('data')[0] || {};
    res.render('signin', { validationErrors, data });
  };
  