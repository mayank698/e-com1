const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  reviewProduct,
  getProductReview,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/");
router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorisedRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorisedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorisedRoles("admin"), deleteProduct);
router.route("/review").put(isAuthenticatedUser, reviewProduct);
router.route("/product/:id").get(getProductDetails);
router
  .route("/getreviews")
  .get(getProductReview)
  .delete(deleteReview, isAuthenticatedUser);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorisedRoles("admin"), getAdminProducts);

module.exports = router;
