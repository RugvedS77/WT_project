const express = require('express')
const router = express.Router()

router.get('/home',(req,res)=>{
    render('home');
})

module.exports = router