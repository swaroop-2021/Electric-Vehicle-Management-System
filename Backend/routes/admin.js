const path = require('path');

const express = require('express');

const Controller = require('../controller/admin');

const router = express.Router();

router.post('/login', Controller.login);

router.post('/signup', Controller.signup);

router.get('/deploy_new_system', Controller.depolyNewSystem);

router.get('/connect_existing_system', Controller.connectExistingSystem);

router.post('/addCS',Controller.addCS);

router.post('/addEV',Controller.addEV);

router.post('/addPolicy',Controller.addPolicy);

router.post('/chargeEV',Controller.accessControl);

module.exports = router;