// this will create a router instance
const router = require('express').Router();

// this will Import user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// this will Define endpoints for user and thought routes
router.use('/user',userRoutes);
router.use('/thought',thoughtRoutes);

// Export the router
module.exports = router;