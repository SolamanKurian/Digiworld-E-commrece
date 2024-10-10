
const jwt = require('jsonwebtoken');
const adminAuthTocken=(req,res,next)=>{
    
let tocken=req.query.tocken;

if (!tocken) {
   
    return res.status(401).json({ message: 'Unauthorized' });
}
jwt.verify(tocken, process.env.TOCKEN_SECRET, (err, decoded) => {
    if (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    req.adminId = decoded._id;// actually no need to send this data to controller, but this is how it will send
    next();
});

}
module.exports={adminAuthTocken};