import mongoose from "mongoose";
import { attemptSchema } from "./attemptSchema";
import { surveySchema } from "./surveySchema";
import { questionSchema } from "./questionSchema";

export const Attempt = mongoose.model('Attempt', attemptSchema);
export const Survey = mongoose.model('Survey', surveySchema);
export const Question = mongoose.model('Question', questionSchema);