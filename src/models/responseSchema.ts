import mongoose from "mongoose";
const { Schema } = mongoose;

const responseSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  attempt: { type: Schema.Types.ObjectId, ref: 'Attempt', required: true },
}, {discriminatorKey: 'type'});

const openEndedResponse = new Schema({
    result: { type: String },
});
export const OpenEndedResponse = responseSchema.discriminator('open-ended', openEndedResponse);

const multipleChoiseResponseSchema = new Schema({
    selectedOption: { type: Number, required: true },
});
export const MultipleChoiceResponse = responseSchema.discriminator('multiple-choice', multipleChoiseResponseSchema);

const binaryChoiceResponseSchema = new Schema({
    choice: { type: Boolean, required: true },
});
export const BinaryChoiceResponse = responseSchema.discriminator('binary-choice', binaryChoiceResponseSchema);

const likertScaleResponseSchema = new Schema({
    rating: { type: Number, required: true },
});
export const LikertScaleResponse = responseSchema.discriminator('likert-scale', likertScaleResponseSchema);