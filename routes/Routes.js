const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');
const { CreateValidadtion, ClientValidation} = require('../utils/validation');

router.post('/create', CreateValidadtion, agencyController.Create);
router.put("/update", ClientValidation, agencyController.Update)
router.get('/top_clients_agencies', agencyController.GetTopListedAgencies);
module.exports = router;