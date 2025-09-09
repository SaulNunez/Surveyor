import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { BinaryChoiceQuestion, LikertScaleQuestion, MultipleChoiceQuestion, OpenEndedQuestion, Question } from "./questionSchema";

export class Survey {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ default: Date.now })
  public createdAt!: Date;

  @prop({ required: true })
  public user!: mongoose.Types.ObjectId;

  @prop({ 
    type: Question,
        discriminators: () => [
          OpenEndedQuestion, MultipleChoiceQuestion, BinaryChoiceQuestion, LikertScaleQuestion
        ]
   })
  public questions!: Question[];
}
export const SurveyModel = getModelForClass(Survey);