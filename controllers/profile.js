const handleProfile = (req, res, db) => {
    const { id } = req.params;
    let isFound = false;

    database.users.forEach((user) => {
        if (user.id === id) {
            isFound = true;
            return res.json(user);
        }
    });
    if (isFound === false) {
        res.status(404).json("No such user");
    }
};

module.exports = {
    handleProfile: handleProfile,
};
