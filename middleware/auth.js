var jwt = require('jsonwebtoken');

// This middleware helps to authorize tokens sent from the frontend by verifying it with the creation secret key
const auth = (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log("BLAA" + authorization)
    let token = null;
    //find token
    if (authorization && authorization.split(" ").length===2) {
        token = authorization.split(" ")[1]
        console.log("Token: ", token) 
    }else {
        res.status(401).json({error: true, message: "Unauthorized"})
        return;
    }

    //verify the JWT to see if it matches the token on the client side
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        console.log("JALALALALAL " + decoded)
        if (decoded.exp < Date.now()) {
            return res.status(401).json({error: true, message: "Token expired"})
        }else {
            console.log("Success")
        }
        
        next()
    } catch(err) {
        // console.log("Token is not valid ", err)
        return res.status(401).json({error: true, message: "Unauthorized"})
    }
}

module.exports = auth;