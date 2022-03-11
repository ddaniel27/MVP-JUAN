const {postASeller, getASeller, updateASeller, deleteASeller} = require('../controllers/sellerController')

module.exports = (router) => {
    router.route('/seller')
        .get(getASeller)
        .post(postASeller)
        .put(updateASeller)
        .delete(deleteASeller)
}