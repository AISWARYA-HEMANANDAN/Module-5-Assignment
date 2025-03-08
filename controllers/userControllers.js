const User = require("../model/userModel")

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body
        if (!name || !email || !age) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const newUser = new User({ name, email, age })
        const users = await newUser.save()
        res.status(201).json({ message: 'User created successfully', users })
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({ error: error.message || "Internal server error" })

    }
}

// Get all users
const readAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ message: 'Users fetched successfully', users })
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({ error: error.message || "Internal server error" })

    }
}

// Get a single user by ID
const readSingleUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)
        if (!user.length) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User fetched successfully', user })
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({ error: error.message || "Internal server error" })
    }
}

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params
        const { name, email, age } = req.body
        const updatedUsers = await User.findByIdAndUpdate(userId, req.body, { new: true })
        if (!updatedUsers.length) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User updated successfully', updatedUsers })
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({ error: error.message || "Internal server error" })
    }
}

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        const filteredUsers = await User.findByIdAndDelete(userId)
        if (filteredUsers.length === User.length) {
            return res.status(404).json({ message: 'User not found' })
        }
        User = filteredUsers
        res.status(200).json({ message: 'User deleted successfully', User })
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).json({ error: error.message || "Internal server error" })
    }
}

module.exports = {
    createUser, readAllUsers, readSingleUser, updateUser, deleteUser
}