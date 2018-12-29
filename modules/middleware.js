// MIDDLEWARE TO VERIFY A TOKEN
F.middleware('ReqAuth', (req, res, next, options) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers.token;
    const tokenInfo = token ? F.decrypt(token) || false : false;
    const isRequireAdmin = options && options.checkPermissions;

    if (tokenInfo) {
        const tokenUserMeta = tokenInfo[`${CONFIG('audience-namespace')}user_metadata`] || {};
        if (isRequireAdmin && !tokenUserMeta.isAdmin) return F.response403(req, res);
        return next(true); // valid, go ahead
    }

    return F.response401(req, res); // no auth token was passed or the provided auth token is invalid.
});
