import StepCounter from "../../models/exercise/StepCounter.js";

export const setGoalForStepCounter = async (req, res) => {
  try {
    const { goal } = req.body;
    const userId = req.user;

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

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
      data: newStepGoal,
      message: "Goal set successfully for 24 hours.",
    });
  } catch (error) {
    console.error("Step goal error:", error);
    res.status(500).json({
      success: false,
      message: "Error setting step goal",
    });
  }
};

export const setStepCounterStats = async (req, res) => {
  try {
    const { steps, distance, calories } = req.body;
    const userId = req.user;

    const now = new Date();

    const existingUserGoal = await StepCounter.findOne({
      user: userId,
      expiresAt: { $gt: now },
    });

    if (!existingUserGoal) {
      return res.status(404).json({
        success: false,
        message: "No active step goal found for the user.",
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
      message: "Error setting step counter stats",
    });
  }
};
