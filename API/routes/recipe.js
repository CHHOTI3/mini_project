import express from "express";
const router = express.Router();
import {
  add,
  getAllRecipe,
  getRecipeById,
  getRecipeByUserId,
  savedRecipeById,
  getSavedRecipe,
} from "../controllers/recipe.js";
import { Authenticate } from "../middlewares/auth.js";

//create recipe
router.post("/add",Authenticate, add);

//get all recipe
router.get("/", getAllRecipe);

//get all saved recipe
router.get("/saved", getSavedRecipe);

//get recipe by id
router.get("/:id", getRecipeById);

//get recipe by userId
router.get("/user/:id", getRecipeByUserId);

//get saved recipe by id
router.post("/:id", Authenticate, savedRecipeById);



export default router;
