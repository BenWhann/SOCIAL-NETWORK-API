const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

const friendCount = async () => {
    const numberOfUsers = await User.aggregate()
        .count('friendCount');
    return numberOfUsers;
}

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                friendCount: await friendCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({
                user,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }
            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            console.log(user);

            if (!user) {
                return res.status(404).json({
                    message: 'No such user exists',
                });
            }
            res.json(user)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

