import mongoose from "mongoose";
const { Schema } = mongoose;

const options = { discriminatorKey: 'type' };
export const questionSchema = new Schema({
  text: { type: String, required: true },
  responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }],
}, options);

const openEndedOptionSchema = new Schema({
    result: { type: String },
});
export const OpenEndedQuestion = questionSchema.discriminator('open-ended', openEndedOptionSchema);

const multipleChoiceOptionSchema = new Schema({
    options: [{ type: String }],
});
export const MultipleChoiceQuestion = questionSchema.discriminator('multiple-choice', multipleChoiceOptionSchema);

const binaryChoiceOptionSchema = new Schema({
    positiveLabel: { type: String },
    negativeLabel: { type: String },
});
export const BinaryChoiceQuestion = questionSchema.discriminator('binary-choice', binaryChoiceOptionSchema);

const likertScaleOptionSchema = new Schema({
    positiveLabel: { type: String },
    negativeLabel: { type: String }
});
export const LikertScaleQuestion = questionSchema.discriminator('likert-scale', likertScaleOptionSchema);

