import Diet from "../../models/nutrition/Diet.js";

export const createDiet = async (dietData, dietImage) => {
  const { subcategory, name, intake, macronutrient, features, benefits, totalCalories, macronutrientPercent } =
    dietData;

  const parsedMacronutrient =
    typeof macronutrient === "string"
      ? JSON.parse(macronutrient)
      : macronutrient;

  const parsedFeatures =
    typeof macronutrient === "string" ? JSON.parse(features) : features;

    const parsedMacronutrientPercent =
    typeof macronutrientPercent === "string"
      ? JSON.parse(macronutrientPercent)
      : macronutrientPercent;


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
    totalCalories: Number(totalCalories),
    macronutrientPercent: {
      protein: Number(parsedMacronutrientPercent.protein),
      carbohydrates: Number(parsedMacronutrientPercent.carbohydrates),
      fats: Number(parsedMacronutrientPercent.fats),
    },

  });

  await diet.save();
  return diet;
};

export const getAllDiet = async (page, limit, searchTerm) => {
  let skip = 0;
  let lim;
  let pg;

  if(limit && page){
    lim = parseInt(limit);
    pg = parseInt(page);
    skip = (pg - 1) * lim;
  }
  const diets = await Diet.find({name: {$regex: searchTerm, $options: 'i' }}).populate({
    path: "subcategory",
   populate: {
      path: "category",
      select: "name",
    },
  }).limit(lim).skip(skip);
  const totalCounts = await Diet.countDocuments();
  const totalPages = Math.ceil(totalCounts / lim);
  const currentPage = pg;
  return {diets, totalCounts, totalPages, currentPage};
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

export const getDietBySubcategory = async (subcategoryId) => {
  const diets = await Diet.find({ subcategory: subcategoryId }).populate({
    path: "subcategory",
    populate: {
      path: "category",
      select: "name",
    },
  });
  return diets;
}
