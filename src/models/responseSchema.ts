import { getDiscriminatorModelForClass, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Question, QuestionType } from "./questionSchema";
import { Attempt } from "./attemptSchema";

@modelOptions({
  schemaOptions: {
    discriminatorKey: 'responseType',
  },
})
export class Response {
    @prop()
    public _id!: string;

    @prop({ ref: () => Question, required: true, type: () => String })
    public question!: Ref<Question, string>;

    @prop({ required: true })
    public responseType!: string;
}

export const ResponseModel = getModelForClass(Response);

export class OpenEndedResponse extends Response {
    @prop({ required: true })
    public response!: string;
}

export const OpenEndedResponseModel = getDiscriminatorModelForClass(ResponseModel, OpenEndedResponse, QuestionType.OPEN_ENDED);

export class MultipleChoiceResponse extends Response {
    @prop({ required: true })
    public selectedOption!: number;
}
export const MultipleChoiceResponseModel = getDiscriminatorModelForClass(ResponseModel, MultipleChoiceResponse, QuestionType.MULTIPLE_CHOICE);

export class BinaryChoiceResponse extends Response {
    @prop({ required: true })
    public choice!: boolean;
}
export const BinaryChoiceResponseModel = getDiscriminatorModelForClass(ResponseModel, BinaryChoiceResponse, QuestionType.BINARY_CHOICE);

export class LikertScaleResponse extends Response {
    @prop({ required: true })
    public rating!: number;
}
export const LikertScaleResponseModel = getDiscriminatorModelForClass(ResponseModel, LikertScaleResponse, QuestionType.LIKERT_SCALE);