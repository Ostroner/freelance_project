import user from "../tables/usertable.js";

const createUser = async (req, res) => {
     const { name, email, password, roleId } = req.body; 
        try {
            // Only include roleId if provided
            const userData = { name, email, password };
            if (roleId) {
                userData.roleId = roleId;
            }
            const newUser = await user.create(userData);
            res.status(201).json({
                message: "User created",
                user: newUser
            });
        } catch (error) {
            console.error("Error creating user:", error.message);
            res.status(500).json({ error: "Failed to create user" });   
        }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await user.findOne({ where: { email } });
        if (!foundUser) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        if (foundUser.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(200).json({
            message: "Login successful",
            user: foundUser
        });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ error: "Failed to login" });
    }
}

export { createUser, loginUser };