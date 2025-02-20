const JWT=require("jsonwebtoken")

const secret ="helloblog"

function createTokenForUser(user){
  const payload={
    _id:user._id,
    email:user.email,
    profileImageUrl:user.profile,
    role:user.role
  }

  const token = JWT.sign(payload,secret)
  return token
}

function payloadverify(token){
const payload=JWT.verify(token,secret)
return payload
}

module.exports={
  createTokenForUser,
  payloadverify
}