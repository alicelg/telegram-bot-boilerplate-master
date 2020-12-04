const { router } = require('../app');

const express = require('express').Router();

const apiInfoRouter = require('./api/info');
const apiCreatorsRouter = require('./api/creators');

router.use('/info', apiInfoRouter);
router.use('/creators', apiCreatorsRouter);


module.exports = router;