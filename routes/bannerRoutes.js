const {
  addBanner,
  getBanners,
  removeBanner,
  updateBanner,
  geBannerById,
} = require("../controllers/bannerController");
const { upload } = require("../shared/multerService");
const router = require("express").Router();

router.get("/all", getBanners);
router.delete("/:id", removeBanner);
router.get("/:id", geBannerById);
router.put("/", updateBanner);
router.post("/", upload.single("image"), addBanner);

module.exports = router;
