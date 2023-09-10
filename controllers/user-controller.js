const { User } = require('../models');

const UserController = {
  // 1. this will Get all users
  
  getAllUsers(req, res) {
    User.find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // 2.this will  Get one user by ID
  
  getUserById(req, res) {
    User.findById(req.params.userId)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },
  
  // 3. this will Create a user
  
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  },

  // 4.this will Update user by ID
  
  updateUserById(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User was NOT found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },

  // 5. this willDelete user
  
  deleteUserById(req, res) {
    User.findOneAndDelete(req.params.id)
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User was Not found' });
        }
        res.json({ message: 'User was deleted successfully' });
      })
      .catch(err => res.status(500).json(err));
  },

  // 6. this Adds a friend to user's friend list
  
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId} },
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User was NOT found' });
        }
        res.json(userData);
      })
      .catch(err => res.status(500).json(err));
  },


  // this will  Remove friend from user's friend list

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "There is no user with this id!" });
        }
        
        //lets  check if friend was removed
        const removed = !dbUserData.friends.includes(params.friendId);
       
        // this will return response with appropriate message
        if (removed) {
          res.json({ message: "Friend was removed successfully!", dbUserData });
        } else {
          res.json(dbUserData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};


// Export UserController
module.exports = UserController;