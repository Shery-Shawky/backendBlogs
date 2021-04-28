const express=require('express');
const router =express.Router();

router.get('/',(req,res)=>res.send('Use router'));

module.exports=router;