const { Router } = require("express");
const user=require("../model/user")
const router=Router()

router.get("/signup",(req,res)=>{
  return res.render("signup")
})

router.get("/signin",(req,res)=>{
  return res.render("signin")
})

router.post("/signin",async (req,res)=>{
  
  const {email,password}=req.body
  console.log("signin")
  const User=await user.matchpassword(email,password)
  
  console.log("token",User)
  return res.cookie("token",User).redirect("/")
})


router.post("/signup",async(req,res)=>{
  const {fullname,email,password}=req.body

  await user.create({
    fullname,
    email,
    password
  })
  return res.redirect("/")
})

router.get("/logout", (req,res)=>{
  res.clearCookie("token").redirect("/")
})

module.exports=router