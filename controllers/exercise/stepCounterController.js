import StepCounter from "../../models/exercise/StepCounter.js";

export const setGoalForStepCounter = async (req, res) => {
  try {
    const { goal } = req.body;
    const userId = req.user;

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1 * 60 * 1000);

    const existingGoal = await StepCounter.findOne({
      user: userId,
      expiresAt: { $gt: now },
    });

    if (existingGoal) {
      return res.status(400).json({
        success: false,
        message: "Goal already set and active for the next 24 hours.",
      });
    }

    const newStepGoal = new StepCounter({
      user: userId,
      goal: goal,
      expiresAt: expiresAt,
    });

    await newStepGoal.save();

    res.status(201).json({
      success: true,
      message: "Goal set successfully for 24 hours.",
    });
  } catch (error) {
    console.error("Step goal error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGoalForStepCounter = async (req, res) => {
  try {
    const userId = req.user;

    const now = new Date();

    const existingGoal = await StepCounter.findOne({
      user: userId,
      expiresAt: { $gt: now },
    });
    if (existingGoal) {
      return res.status(200).json({
        success: true,
        data: existingGoal,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const setStepCounterStats = async (req, res) => {
  try {
    const { goalId, steps, distance, calories } = req.body;
    const userId = req.user;
    const existingUserGoal = await StepCounter.findOne({
      _id: goalId,
      user: userId,
    });

    if (!existingUserGoal) {
      return res.status(404).json({
        success: false,
        message: "No active step goal found for the user.",
      });
    }

    if (existingUserGoal.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Goal has expired.",
      });
    }

    existingUserGoal.steps = steps;
    existingUserGoal.distance = distance;
    existingUserGoal.calories = calories;

    await existingUserGoal.save();

    res.status(200).json({
      success: true,
      data: existingUserGoal,
      message: "Step stats updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStepCounterStats = async (req, res) => {
  try {
    const userId = req.user;
    const existingUserGoal = await StepCounter.find({ user: userId });
    if (!existingUserGoal) {
      return res.status(404).json({
        success: false,
        message: "No active step stats found for the user.",
      });
    }
    res.status(200).json({
      success: true,
      data: existingUserGoal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
