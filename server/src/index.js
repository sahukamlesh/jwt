const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { json } = require("express");
const passwordHash = require("password-hash");
const jwt = require('jsonwebtoken');
const cors = require('cors')

let users = [];
const jwtSecret = "secret@"

function saveUserToFile(user) {
  users.push(user);
  fs.writeFileSync(
    path.join(__dirname, "../data/users.json"),
    JSON.stringify(users)
  );
}
function readUsersFromFile() {
  console.log(path.join(__dirname, "../data/users.json"));
  const buffer = fs.readFileSync(path.join(__dirname, "../data/users.json"));
  //  users = JSON.parse(buffer.toString())
  const stringData = buffer.toString();
  if (stringData) {
    users = JSON.parse(stringData);
  }
}
readUsersFromFile();
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
  console.log("Listenning on PORT 3001...");
});

app.get("/", (request, response) => {
  response.json({
    message: "Api is Working ....",
  });
});

app.get("/api/users", (request, response) => {
  response.json({ users });
});

app.post("/api/users/register", (request, response) => {
  console.log("User registsrtion in progress");
  const user = request.body;
  user.id = uuid();
  user.password = passwordHash.generate(user.password);
  saveUserToFile(user);
  return response.json({
    user,
    message: "User Registsrstion",
  });
});

app.post("/api/users/login", (request, response) => {
  console.log("User registsrtion in progress");
  const {email,password} = request.body;
  console.log(email,password)
  const user = users.find((user)=>{
      if(user.email === email ){
        return true;
      }
  });
  if(user &&  passwordHash.verify(password,user.password)){
    const payload = {id:user.id,email:user.email}
      const token = jwt.sign(payload,jwtSecret)
      console.log(token)
      return response.json({message:"Login Sucess",token,type:"Bearer"})
  }
  return response.status(400).json({
    message:"invalid Email  or Password",
   });
});


function authMiddleware(request,response,next){
  const{authorization}=request.headers;
  if(!authorization){
    return response.status(400).json({error:"Unauthorized access"})
  }
  const spillted = authorization.split(' ')
  if(spillted.length !=2){
    return response.status(400).json({error:"Unauthorized access"})
  }
  const token =spillted[1]
  try{
    jwt.verify(token,jwtSecret)
  }catch(error){
    return response.status(400).json({error:"Unauthorized access"})
  }
  next();
}
app.get("/api/orders",authMiddleware,(request,response)=>{
  response.json({orders:["detail1","details2"]})
})

app.get("/api/profile",authMiddleware,(request,response)=>{
  response.json({profile:{name:"kamlesh"}})
});