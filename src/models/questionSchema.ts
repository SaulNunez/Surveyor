import { getDiscriminatorModelForClass, getModelForClass, prop } from "@typegoose/typegoose";

export enum QuestionType {
    OPEN_ENDED = 'open-ended',
    MULTIPLE_CHOICE = 'multiple-choice',
    BINARY_CHOICE = 'binary-choice',
    LIKERT_SCALE = 'likert-scale'
}

export class Question {
    @prop({ required: true })
    public text!: string;
}

export const QuestionModel = getModelForClass(Question);
export class OpenEndedQuestion extends Question {
}

export const OpenEndedQuestionModel = getDiscriminatorModelForClass(QuestionModel, OpenEndedQuestion, QuestionType.OPEN_ENDED);
export class MultipleChoiceQuestion extends Question {
    @prop({ required: true })
    public options!: string[];
}
export const MultipleChoiceQuestionModel = getDiscriminatorModelForClass(QuestionModel, MultipleChoiceQuestion, QuestionType.MULTIPLE_CHOICE);
export class BinaryChoiceQuestion extends Question {
    @prop({ required: true })
    public positiveLabel!: string;

    @prop({ required: true })
    public negativeLabel!: string;
}
export const BinaryChoiceQuestionModel = getDiscriminatorModelForClass(QuestionModel, BinaryChoiceQuestion, QuestionType.BINARY_CHOICE);
export class LikertScaleQuestion extends Question {
    @prop({ required: true })
    public positiveLabel!: string;
    
    @prop({ required: true })
    public negativeLabel!: string;
}
export const LikertScaleQuestionModel = getDiscriminatorModelForClass(QuestionModel, LikertScaleQuestion, QuestionType.LIKERT_SCALE);