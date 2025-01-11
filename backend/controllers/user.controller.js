import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    const userCount = filteredUsers.length;

    const genderBreakdown = filteredUsers.reduce(
      (acc, user) => {
        acc[user.gender]++;
        return acc;
      },
      { male: 0, female: 0 }
    );

    const noProfilePicCount = filteredUsers.filter(
      (user) => !user.profilePic || user.profilePic.trim() === ""
    ).length;

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const newUsers = filteredUsers.filter(
      (user) => new Date(user.createdAt) >= last7Days
    ).length;

    res.status(200).json({
      users: filteredUsers,
      stats: {
        userCount,
        genderBreakdown,
        noProfilePicCount,
        newUsersLast7Days: newUsers,
      },
    });
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
