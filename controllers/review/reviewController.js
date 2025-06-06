import * as reviewService from "../../services/review/reviewService.js";

export const addReview = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const review = await reviewService.addReview(userId, message);
    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

export const getReviews = async (req, res) => {
    try{
        const reviews = await reviewService.getReviews();
        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json({ message: "Error getting reviews", error });
    }
}
