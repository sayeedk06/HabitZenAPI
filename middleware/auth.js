var jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const authorization = req.headers.authorization;
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

        if (decoded.exp < Date.now()) {
            return res.status(401).json({error: true, message: "Unauthorized"})
        }
        next()
    } catch(err) {
        console.log("Token is not valid ", err)
        return res.status(401).json({error: true, message: "Unauthorized"})
    }
}

module.exports = auth;