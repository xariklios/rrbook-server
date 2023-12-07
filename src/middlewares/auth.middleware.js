// Middleware to check if the user is authenticated
exports.isAuthenticated = async(req, res, next) => {
    if (req.isAuthenticated()) {
        return next();  // User is authenticated, proceed to the next middleware or route handler
    } else {
        res.redirect('/login');  // Redirect to login if not authenticated
    }
}
