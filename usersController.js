const User = require("./models/User");

exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    console.log(
      "Fetching users for page:",
      page,
      "Skip:",
      skip,
      "Limit:",
      limit
    );

    const users = await User.find().skip(skip).limit(limit).exec();
    console.log("Users fetched:", users);

    const ageStats = await User.aggregate([
      { $match: { age: { $exists: true, $ne: null } } },
      { $group: { _id: null, averageAge: { $avg: "$age" } } },
    ]);
    console.log("Age statistics:", ageStats);

    const averageAge = ageStats.length > 0 ? ageStats[0].averageAge : null;

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.render("users/index", {
      users,
      averageAge,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error("Error in getUsers:", err.message);
    res.status(500).send("Error fetching users. Please try again later.");
  }
};
