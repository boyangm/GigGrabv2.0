const router = require("express").Router();
const axios = require('axios');

const MY_API_KEY = process.env.MY_API_KEY || 'AFeiQyudCRNK8T2g46sKFz';
const client = require('filestack-js').init(MY_API_KEY);
 
// router.get('api/', (req,res) =>{

// })

module.exports = router;