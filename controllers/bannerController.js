const { Banner } = require("../models/Banner");
const { handleAsync } = require("../shared/handleAsync");

const addBanner = handleAsync(async (req, res) => {
  const { telegramLink, category, title, description } = req.body;

  if (
    !telegramLink ||
    !category ||
    !req?.file?.filename ||
    !title ||
    !description
  )
    return res
      .status(400)
      .json({ message: "All fields are required", data: [] });

  const banner = new Banner({
    telegramLink,
    title,
    description,
    category,
    imageUrl: req.file.filename,
  });
  const savedBanner = await banner.save();
  if (savedBanner)
    return res.status(200).json({ message: "Success", data: [] });
  return res.status(400).json({ message: "Invalid request", data: [] });
});

const getBanners = handleAsync(async (req, res) => {
  const banners = await Banner.find().sort("-createdAt");
  if (banners)
    return res.status(200).json({ message: "Success", data: banners });
  return res.status(400).json({ message: "Invalid request", data: [] });
});

const removeBanner = handleAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deletedBanner = await Banner.findByIdAndDelete(id);
  if (deletedBanner)
    return res.status(200).json({ message: "Success", data: [] });
  return res.status(400).json({ message: "Invalid request", data: [] });
});

const updateBanner = handleAsync(async (req, res) => {
  const { telegramLink, id, category, title, description } = req.body;
  const banner = await Banner.findById(id);

  if (!banner)
    return res.status(400).json({ message: "Invalid Banner Id", data: [] });

  if (telegramLink) banner.telegramLink = telegramLink;
  banner.title = title;
  banner.description = description;
  banner.category = category;

  const updatedBanner = await banner.save();
  if (updatedBanner)
    return res.status(200).json({ message: "Success", data: [] });
  return res.status(400).json({ message: "Invalid request", data: [] });
});

const geBannerById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findById(id);
  if (banner) return res.status(200).json({ message: "Success", data: banner });
  return res.status(400).json({ message: "Invalid request", data: [] });
});

module.exports = {
  addBanner,
  updateBanner,
  geBannerById,
  removeBanner,
  getBanners,
};
