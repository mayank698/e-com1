const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/passwordUpdate").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/me").get(isAuthenticatedUser, getUserDetail);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorisedRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorisedRoles("admin"), getSingleUser)
  .delete(isAuthenticatedUser, authorisedRoles("admin"), deleteUser)
  .put(isAuthenticatedUser, authorisedRoles("admin"), updateRole);

module.exports = router;
