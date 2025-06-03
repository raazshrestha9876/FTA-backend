import Diet from "../../models/nutrition/Diet.js";

export const createDiet = async (dietData, dietImage) => {
  const { subcategory, name, intake, macronutrient, features, benefits } =
    dietData;

  const parsedMacronutrient =
    typeof macronutrient === "string"
      ? JSON.parse(macronutrient)
      : macronutrient;

  const parsedFeatures =
    typeof macronutrient === "string" ? JSON.parse(features) : features;

  const diet = new Diet({
    subcategory,
    name,
    intake: Number(intake),
    macronutrient: {
      protein: Number(parsedMacronutrient.protein),
      carbohydrates: Number(parsedMacronutrient.carbohydrates),
      fats: Number(parsedMacronutrient.fats),
    },
    features: parsedFeatures,
    benefits,
    image: dietImage,
  });

  await diet.save();
  return diet;
};

export const getAllDiet = async () => {
  const diets = await Diet.find().populate({
    path: "subcategory",
   populate: {
      path: "category",
      select: "name",
    },
  });
  return diets;
};
export const getDietById = async (categoryId) => {
  const diet = await Diet.findById(categoryId).populate({
    path: "subcategory",
    populate: {
      path: "category",
      select: "name",
    },
  });
  return diet;
};
