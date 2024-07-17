const jwt = require('jsonwebtoken');

function tokenize(username, email, timeInMs=36000000 * 1 ){     //10 hr
    const token = jwt.sign(
        {username, email}, 
        process.env.SECRET_KEY, 
        {expiresIn: timeInMs}
    )
    console.log("New token generated !")
    return token
}

module.exports = tokenize;