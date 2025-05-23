import * as exerciseService from "../../services/exercise/exerciseService.js";

export const getAllExercises = async(req, res) => {
    try{
    const exercises = await exerciseService.getAllExercises();
    res.status(200).json(exercises);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getExercisesByDay = async (req, res) => {
    try {
        const dayId = req.params.dayId;
        const exercises = await exerciseService.getExercisesByDay(dayId);
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
}

export const createExercise = async (req, res) => {
    try {
        const exercise = await exerciseService.createExercise(req.body);
        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateExercise = async (req, res) => {
    try {
        const { exerciseId } = req.params;
        const exercise = await exerciseService.updateExercise(exerciseId, req.body);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }
        res.status(200).json(exercise);
    }
    catch (error) { 
        res.status(500).json({ message: error.message });
    }
}

export const deleteExercise = async (req, res) => {
    try {
        const { exerciseId } = req.params;
        await exerciseService.deleteExercise(exerciseId);
        res.status(204).json({ message: "Exercise deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
