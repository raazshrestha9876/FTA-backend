import * as exerciseService from "../../services/exercise/exerciseService.js";

export const getAllExercises = async (req, res) => {
  try {
    const { exercises, totalCounts, totalPages, currentPage } =
      await exerciseService.getAllExercises(
        req.query.page || 1,
        req.query.limit || 10,
        req.query.searchTerm || ""
      );
    res.status(200).json({
      data: exercises,
      totalCounts: totalCounts,
      totalPages: totalPages,
      currentPage: currentPage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExercisesBySubcategory = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const exercises = await exerciseService.getExercisesBySubcategory(subcategoryId);
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getExerciseById = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const exercise = await exerciseService.getExerciseById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExercise = async (req, res) => {
  try {
    const exercise = await exerciseService.createExercise(
      req.body,
      req.file.filename
    );
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const updateExercise = async (req, res) => {
//     try {
//         const { exerciseId } = req.params;
//         const exercise = await exerciseService.updateExercise(exerciseId, req.body);
//         if (!exercise) {
//             return res.status(404).json({ message: "Exercise not found" });
//         }
//         res.status(200).json(exercise);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// export const deleteExercise = async (req, res) => {
//     try {
//         const { exerciseId } = req.params;
//         await exerciseService.deleteExercise(exerciseId);
//         res.status(204).json({ message: "Exercise deleted" });
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
