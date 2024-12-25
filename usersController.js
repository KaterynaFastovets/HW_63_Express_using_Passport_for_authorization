const User = require("./models/User"); 


exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = 10; 
  const skip = (page - 1) * limit; 

  try {
    
    const usersCursor = User.find().skip(skip).limit(limit);
    const users = await usersCursor.exec(); сторінки

    const ageStats = await User.aggregate([
      { $group: { _id: null, averageAge: { $avg: "$age" } } },
    ]);

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
    res.status(500).send("Error fetching users");
  }
};
