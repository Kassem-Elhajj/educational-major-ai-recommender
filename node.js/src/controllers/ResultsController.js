const Result = require('../models/Result');
const User = require('../models/User');

// Get all results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.findAll({ where: { userId: req.user.userId } }); // or remove filter if admin
    res.json({ status: 'ok', results, message: 'Results fetched successfully' }); // ✅ proper response
  } catch (err) {
    res.status(500).json({ status: 'failed', message: err.message });
  }
};


// Get single result by ID
const getResultById = async (req, res) => {
  try {
    const id = req.params.id;

    //find result by id
    const result = await Result.findOne({
      where: { id, userId: req.user.userId } // or remove filter if admin
    });

    if (!result) {
      return res.status(404).json({ status: 'failed', message: 'Result not found' });
    }

    res.json({ status: 'ok', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'failed', message: err.message });
  }
};

module.exports = {
  getAllResults,
  getResultById
};
