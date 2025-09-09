import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { Survey } from "./surveySchema";
import { BinaryChoiceResponse, LikertScaleResponse, MultipleChoiceResponse, OpenEndedResponse, Response } from "./responseSchema";

export class Attempt {
  @prop()
  public _id!: string;

  @prop({ required: true })
  public user!: mongoose.Types.ObjectId;

  @prop({ required: true, ref: () => Survey, type: () => String })
  public survey!: Ref<Survey, string>;

  @prop({ default: Date.now })
  public startedAt!: Date;

  @prop()
  public completedAt?: Date;

  @prop({ 
    type: Response,
    discriminators: () => [
      OpenEndedResponse, MultipleChoiceResponse, BinaryChoiceResponse, LikertScaleResponse
    ]
   })
  public responses?: Response[];
}

export const AttemptModel = getModelForClass(Attempt);