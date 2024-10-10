const jwt = require('jsonwebtoken');
const authTocken=(req,res,next)=> {
   let token=req.query.tocken;
   
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.TOCKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports={authTocken}