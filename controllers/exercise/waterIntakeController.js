import WaterIntake from "../../models/exercise/WaterIntake.js";
import User from "../../models/user/User.js";

export const addWaterIntake = async (req, res) => {
  try {
    const { water } = req.body;
    const userId = req.user;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiresAt = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    let waterIntake = await WaterIntake.findOne({
      user: userId,
      date: today,
    });

    if (waterIntake) {
      waterIntake.water += water;
    } else {
    }
    waterIntake = await WaterIntake({
      user: userId,
      water,
      date: today,
      expiresAt: expiresAt,
    });
    await waterIntake.save();
    res.status(201).json({
      message: "Water intake added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWaterIntakeLog = async (req, res) => {
  try {
    const userId = req.user;
    const waterIntake = await WaterIntake.find({ user: userId }).sort({
      date: -1,
    });
    res.status(200).json(waterIntake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
