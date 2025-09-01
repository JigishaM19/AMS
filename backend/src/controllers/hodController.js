// controllers/hodController.js

const createHod = async (req, res) => {
  res.json({ message: "HOD created" });
};

const getAllHods = async (req, res) => {
  res.json({ message: "All HODs fetched" });
};

module.exports = { createHod, getAllHods };
