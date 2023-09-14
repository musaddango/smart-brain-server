
const handleProfile = (req, res, dbase)=>{
    const { id } = req.params;

    dbase.select('*').from("users").where({id})
    .then(user=> {
        if(user.length){
            res.json(user[0])
        }else{
            res.status(400).json("Large Error!");
        }       
    })
    .catch(err => res.status(400).json("Fail to get profile."));
}


module.exports = { handleProfile }