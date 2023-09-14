
const handleRegister = (req, res, dbase, bcrypt)=>{ 
    const { email, password, name } = req.body;
    const hash = bcrypt.hashSync(req.body.password);

    if(!email || !password || !name){
        return res.json('Fill in the required data')
    }

    dbase.transaction(trx=>{
        trx.insert({
            email: email,
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
                trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    entries: 0,
                    joined: new Date()
                })
                .then(user=> {
                    res.json(user)
                })
                .catch(err=> {
                    res.status(400).json('Error')
                });
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    
}


module.exports = { handleRegister }