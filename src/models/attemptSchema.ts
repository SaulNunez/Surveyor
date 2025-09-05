import mongoose from "mongoose";
const { Schema } = mongoose;

export const attemptSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  survey: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});