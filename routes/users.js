var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var authorize = require('../middleware/auth');

/* GET users listing. */

router.get('/',function(req, res, next) {
  const queryUsers = req.db.from("user").select("*")
  queryUsers.then((users)=> {
    if (users.length > 0) {
      console.log(users)
      return res.json(users)
    }else {
      return res.status(400).json({
        error: true,
        message: "No such user exists"
      })
    }
  })

})

router.get('/:email',function(req, res, next) {
  const email = req.params.email
  console.log("eassss "+ email)
  if (!email) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete- email and password needed"
    })
    return;
  }

  const queryUsers = req.db.from("user").select("*").where("email", "=", email)
  queryUsers.then((users)=> {
    if (users.length > 0) {
      console.log(users)
      return res.json(users);
    }else {
      return res.status(400).json({
        error: true,
        message: "No such user exists"
      })
    }
  })

})

router.post('/register', function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  //verify user ifo
  if (!email || !password || !name){
    res.status(400).json({
      error: true,
      message: "Request body incomplete- email and password needed"
    })
    return;
  }

  const queryUsers = req.db.from("user").select("*").where("email", "=", email)
  queryUsers.then((users) => {
    //verify if credintial already exists in database
    if (users.length > 0) {
      console.log("User already exists");
      return;
    }
    const salRounds = 10;
    const hash = bcrypt.hashSync(password, salRounds);
    console.log("Email", email);
    console.log("Password", hash);
    return req.db.from("user").insert({name, email, hash});
  }
  ).then(() => {
    res.status(201).json(
      {success: true, message: "User created" }
    )
  }

  )

});

router.post("/login", function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and passowrd needed"
    })
    return;
  }
  const queryUsers = req.db.from("user").select("*").where("email", "=", email)
  queryUsers.then( (users) => {
    if (users.length == 0) {
      res.status(404).json({
        error: true,
        message: "Requested user not found"
      });
      return;
    }
    const userInfo = users[0]
    return bcrypt.compare(password, userInfo.hash)
  }  
  ).then( (match) => {
    if (!match) {
      console.log("Passwords do not match");
      return;
    }
    //create jwt token
    const expires_in = 60*60*24
    const exp = Date.now() + expires_in*1000
    var token = jwt.sign({email, exp}, process.env.JWT_KEY)
    res.json({token_type: "Bearer", token, expires_in})

  })
});



module.exports = router;
