const express = require('express');
const router = express.Router();

/*
@route    GET api/articles/test
@desc    Tests article route
@access  Public
*/
router.get('/test', (req, res) =>res.json({msg: 'articles works'}));

module.exports = router;
