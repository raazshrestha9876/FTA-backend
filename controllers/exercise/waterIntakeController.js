import WaterIntake from "../../models/exercise/WaterIntake.js";

export const addWaterIntake = async (req, res) => {
  try {
    const { water } = req.body;
    const userId = req.user;

    if (!water || water <= 0) {
      return res.status(400).json({ message: "Invalid water amount" });
    }

    const waterIntake = new WaterIntake({
      user: userId,
      water,
    });

    await waterIntake.save();

    res.status(201).json({
      message: "Water intake added successfully",
      data: waterIntake,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWaterIntakeLog = async (req, res) => {
  try {
    const userId = req.user;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const waterIntake = await WaterIntake.find({
      user: userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });

    res.status(200).json(waterIntake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
