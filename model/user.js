const {Schema, model}=require("mongoose")
const {createTokenForUser}=require("../service/authentication")
const { createHmac, randomBytes } = require('crypto');

const userSchema= new Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  salt:{
    type:String,

  },
  password:{
    type:String,
    required:true,
  },
  profile:{
    type:String,
    default:"/images/user.png"
  },
  role:{
   type:String,
   enum:["USER","ADMIN"],
   default:"USER"
  },


},{timestamps:true})

userSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified("password")) return;

  const salt = randomBytes(16).toString()

  const hashpassword = createHmac('sha256', salt).update(user.password).digest('hex');

  this.salt= salt 
  this.password=hashpassword               
  next();
});

userSchema.static("matchpassword", async function (email,password){
  const user = await this.findOne({email})
  console.log("User", user);
  if(!user)throw new Error('USER NOT FOUND  INVALID EMAIL')
  const salt=user.salt
  const hashpassword=user.password
  
  const userProvidedpassword=createHmac('sha256', salt).update(password).digest('hex');

  if(hashpassword !==userProvidedpassword) throw new Error('Invalid password')

 
  const token= createTokenForUser(user)
  console.log("token",token)
  return token
  
})
const User = model("user",userSchema)


module.exports=User