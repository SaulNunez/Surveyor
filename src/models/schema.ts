import mongoose from "mongoose";
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

const options = { discriminatorKey: 'type' };
const questionSchema = new Schema({
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

const attemptSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  survey: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

const responseSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  attempt: { type: Schema.Types.ObjectId, ref: 'Attempt', required: true },
}, {discriminatorKey: 'type'});

const openEndedResponse = new Schema({
    result: { type: String },
});
export const OpenEndedResponse = questionSchema.discriminator('open-ended', openEndedResponse);

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

