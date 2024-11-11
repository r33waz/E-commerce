import User from "../../model/user.model.js";
import moment from "moment";

export const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = search
      ? {
          $or: [
            { userName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(filter).select("-password -refreshTokens");

    return res.status(200).json({ status: true, data: users });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// get user according to the month

export const getUserByMonth = async (req, res) => {
  const { filterType } = req.query;

  try {
    let matchStage = {};

    if (filterType === "week") {
      // Get the start and end of the current week
      const startOfWeek = moment().startOf("week").toDate();
      const endOfWeek = moment().endOf("week").toDate();

      matchStage = {
        createdAt: {
          $gte: startOfWeek,
          $lte: endOfWeek,
        },
      };
    } else if (filterType === "month") {
      // Get the start and end of the current month
      const startOfMonth = moment().startOf("month").toDate();
      const endOfMonth = moment().endOf("month").toDate();

      matchStage = {
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      };
    }

    const userStats = await User.aggregate([
      { $match: matchStage },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          week: { $isoWeek: "$createdAt" }, // Using ISO week for consistency
        },
      },
      {
        $group: {
          _id:
            filterType === "week"
              ? { week: "$week", year: "$year" }
              : { month: "$month", year: "$year" },
          count: { $sum: 1 },
        },
      },
      {
        $sort:
          filterType === "week"
            ? { "_id.year": 1, "_id.week": 1 }
            : { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const result = userStats.map((item) => ({
      time:
        filterType === "month"
          ? item._id.month
          : filterType === "week"
          ? item._id.week
          : undefined,
      year: item._id.year,
      userCount: item.count,
    }));

    return res.status(200).json({ status: true, data: result });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.role === "admin") {
      return res
        .status(400)
        .json({ status: false, message: "Admin cannot be deleted" });
    }
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
