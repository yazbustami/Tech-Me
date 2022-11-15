const router = require('express').Router();
const userroutes = require('./userroutes');
const commentroute = require('./commentroute');
const postroutes = require('./postroutes');

router.use('/users', userroutes);
router.use('/posts', postroutes);
router.use('/comments', commentroute);

module.exports = router;