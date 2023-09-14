
const handleSignin = (req, res, dbase, bcrypt)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json('Fill in the required data')
    }

    dbase.select('hash', 'email')
        .from('login')
        .where({
            email: email
        })
        .then(user=>{
            const hash = user[0].hash;
            if(bcrypt.compareSync(password, hash)){
                dbase.select('*')
                .from('users')
                .where('email', '=', email)
                .then(user=>{
                    res.json(user[0]); 
                })
             } else{
                res.status(400).json('User data not found');
            }
        });
}

module.exports = { handleSignin }