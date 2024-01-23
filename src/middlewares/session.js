export const verifySession = (req, res, next) => {
    res.locals.isAdmin = (req.session?.user?.role == "admin") ? true : false;
    res.locals.session = req.session;
    res.locals.isAuthenticated = req.session.user ? true : false;
    next();
}