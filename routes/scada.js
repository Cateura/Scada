const express = require("express");
const router = express.Router();


// scada HTML 
router.get('/scada', (req, res) => {
    res.render('scada')
});

module.exports = router