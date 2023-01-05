const express = require('express');
const Sauce = require('../models/Sauce');
const router = express.Router();
const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/stuff');

router.post('/', auth, stuffCtrl.createSauce);
router.get('/:id', auth, stuffCtrl.OneSauce);
router.put('/:id', auth, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.get('/', auth, stuffCtrl.getAllSauce);

module.exports = router;