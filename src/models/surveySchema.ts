import mongoose from "mongoose";
const { Schema } = mongoose;

export const surveySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});