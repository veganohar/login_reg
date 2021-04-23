const controller = require("../controllers/users.controller");
const {userMiddleware} = require("../middlewares");
module.exports = function(app){

    app.post("/api/users/signup", [userMiddleware.checkforDuplicateUsernameEmail], controller.signup);

    app.get("/verify/verify-account/:uid/:secretCode",controller.verifyEmail);
}