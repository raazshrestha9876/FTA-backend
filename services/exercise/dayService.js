import Day from '../models/exercise/Day.js';


export const getAllDays = async () => {
    const days = await Day.find().populate({'path': 'category'});
    return days;
}
export const getDaysByCategory = async (categoryId) => {
    const days = await Day.find({ category: categoryId }).populate({'path': 'category'});
    return days;
}
export const createDay = async (dayData) => {
    const { category, dayNumber, muscleType } = dayData;
    const day = new Day({ category, dayNumber, muscleType});
    await day.save();
    return day;
}