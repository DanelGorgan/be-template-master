const { createError } = require("../helpers/errorHelper");

const getProfile = async (req, res, next) => {
    const {Profile} = req.app.get('models')
    // I would keep only the id notation instead of userId
    let id = req.params.id || req.params.userId;
    if (!id && req.user) {
        id = req.user.id;
    }
    const profile = await Profile.findOne({where: {id: id || 0}})
    if(!profile) return next(createError('Invalid profile', 403));
    req.profile = profile
    next()
}
module.exports = {getProfile}