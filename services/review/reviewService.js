import Review from "../../models/review/Review.js";

export const addReview = async (userId, message) => {
  const review = new Review({
    user: userId,
    message: message,
  });
  await review.save();
  return review;
};

export const getReviews = async () => {
    const review = await Review.find();
    return review;
}