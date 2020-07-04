const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body; // destructure req.body

    if (!name || !email || !password) {
        return res.status(400).json("incorrect form submission");
    }

    const hash = bcrypt.hashSync(password); // hash the password
    db.transaction((trx) => {
        trx.insert({
            hash: hash,
            email: email,
        })
            .into("logins")
            .returning("email")
            .then((loginEmail) => {
                return trx("users")
                    .returning("*") // this will return what is inserted, returns an array
                    .insert({
                        email: loginEmail[0], // put [0] because we need the content of the array returned
                        name: name,
                        joined: new Date(),
                    })
                    .then((user) => {
                        //user is the response, it is the inserted value produced by .returning
                        res.json(user[0]);
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    }).catch((err) => {
        res.status(400).json("Unable to register");
    });
};
module.exports = {
    handleRegister: handleRegister,
};
