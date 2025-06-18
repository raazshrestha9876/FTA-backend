
import * as workoutService from '../../services/exercise/workoutService.js';
 
export const startWorkout = async (req, res) => {
    try{
        const { exerciseIds } = req.body;
        const workout = await workoutService.startWorkout(req.user, exerciseIds);
        res.status(201).json(workout);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

export const stopWorkout = async (req, res) => {
    try{
        const { workoutId } = req.params;
        const workout = await workoutService.stopWorkout(workoutId);
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}


