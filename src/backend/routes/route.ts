import express from "express";
import {
  initialGetController,
  studyPostController,
} from "../controllers/controller";
const router = express.Router();

router.route("/").post(studyPostController).get(initialGetController);

export { router };
