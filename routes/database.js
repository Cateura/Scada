const express = require("express");
const router = express.Router();


// Dashboard HTML 
router.get('/database', (req, res) => {
    res.render('database')
});

module.exports = router