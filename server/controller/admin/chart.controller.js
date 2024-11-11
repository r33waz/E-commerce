import Product from "../../model/product.model.js";
import User from "../../model/user.model.js";

// get products count
export const getProductsCount = async (req, res) => {
  try {
    const categoryCounts = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Transform data to make it easier for the frontend to process
    const responseData = {
      labels: categoryCounts.map((item) => item._id),
      data: categoryCounts.map((item) => item.count),
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Failed to retrieve chart data" });
  }
};

export const totalUser = async (req, res) => {
  try {
    const normalUser = await User.countDocuments({ role: "user" });
    const adminUser = await User.countDocuments({ role: "admin" });
    const totalUser = await User.countDocuments();
    return res.status(200).json({
      status: true,
      data: {
        normalUser,
        adminUser,
        totalUser,
      },
    });
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Failed to retrieve chart data" });
  }
};

export const activeStatus = async (req, res) => {
  try {
    const activeUsers = await User.countDocuments({ isActive: true });
    const inactiveUsers = await User.countDocuments({ isActive: false });

    res.status(200).json({
      status: true,
      data: {
        activeUsers,
        inactiveUsers,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to retrieve user data" });
  }
};
