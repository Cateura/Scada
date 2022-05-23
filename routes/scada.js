const express = require("express");
const router = express.Router();


// Dashboard HTML 
router.get('/scada', (req, res) => {
    res.render('scada')
});

module.exports = router