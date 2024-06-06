const User = require('../models/User');


class UserController {
    async index(req, res, next) {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (err) {
            next(err); // Pass any errors to the error-handling middleware
        }
    }


    // query 
    async validator(req, res, next) {
        try {
            const userEmail = req.body.email;
            const newStatus = req.body.status;

            // Check if email and status are provided in the request body
            if (!userEmail || !newStatus) {
                return res.status(400).send('Email and status are required.');
            }

            // Update the user's status
            const updatedUser = await User.findOneAndUpdate(
                { email: userEmail },
                { status: newStatus },
                { new: true, runValidators: true } // Return the updated document and run validators
            );

            if (!updatedUser) {
                return res.status(404).send('User not found'); // If user is not found, return 404
            }

            res.status(200).json(updatedUser); // If user is updated, return the updated user
        } catch (err) {
            next(err); // Pass any errors to the error-handling middleware
        }
    }
}

module.exports = new UserController();
