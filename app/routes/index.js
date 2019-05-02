const router = module.exports = require('express').Router();
const record = require('./record');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
  });
router.post('/record',record.postSearch);

 