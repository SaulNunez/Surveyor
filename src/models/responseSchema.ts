import { getDiscriminatorModelForClass, getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Question, QuestionType } from "./questionSchema";
import { Attempt } from "./attemptSchema";

class Response {
    @prop({ ref: () => Question, required: true })
    question!: Ref<Question>
}

export const ResponseModel = getModelForClass(Response);

export class OpenEndedResponse extends Response {
    @prop({ required: true })
    response!: string;
}

export const OpenEndedResponseModel = getDiscriminatorModelForClass(ResponseModel, OpenEndedResponse, QuestionType.OPEN_ENDED);

export class MultipleChoiceResponse extends Response {
    @prop({ required: true })
    selectedOption!: number;
}
export const MultipleChoiceResponseModel = getDiscriminatorModelForClass(ResponseModel, MultipleChoiceResponse, QuestionType.MULTIPLE_CHOICE);

export class BinaryChoiceResponse extends Response {
    @prop({ required: true })
    choice!: boolean;
}
export const BinaryChoiceResponseModel = getDiscriminatorModelForClass(ResponseModel, BinaryChoiceResponse, QuestionType.BINARY_CHOICE);

export class LikertScaleResponse extends Response {
    @prop({ required: true })
    rating!: number;
}
export const LikertScaleResponseModel = getDiscriminatorModelForClass(ResponseModel, LikertScaleResponse, QuestionType.LIKERT_SCALE);