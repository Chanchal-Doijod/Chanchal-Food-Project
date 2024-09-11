var express = require('express');
var pool = require('./pool');
var{LocalStorage}=require("node-localstorage")
var localStorage=new LocalStorage('./scratch')
var router = express.Router();


router.get("/admin_login",function(req,res){
  try{
  var User=JSON.parse(localStorage.getItem('User'))
  if(User==null)
  {
    res.render('adminlogin',{message:''})
  }
  else
  {
    res.render('dashboard',{data:User,status:true,message:'Login Success'})
  }}
  catch{
    res.render('adminlogin',{message:''}) 
  }



  

  })

router.post("/check_login",function(req,res){
  pool.query(" select * from admins where (emailid=? or mobileno=? ) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
   if(error)
   {
     res.render('adminlogin',{data:[],status:false,message:'Database Error..Contact Admin'})
   }
   else
   {
   if(result.length==1)
   {
    localStorage.setItem("User",JSON.stringify(result[0]))
    res.render('dashboard',{data:result[0],status:true,message:'Login Success'})
   }
   else{
    res.render('adminlogin',{data:[],status:false,message:'Invalid Details'})
   }

   }


  })

  
})


module.exports = router;
