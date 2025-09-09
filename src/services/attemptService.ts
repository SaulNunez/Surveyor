import { Attempt, AttemptModel } from "../models/attemptSchema";
import { InvalidOperationError } from "../models/Errors/invalidOperationError";
import { NotFoundError } from "../models/Errors/notFoundError";

async function getLatestAttempt(surveyId: string) {
    const latestAttempt = await AttemptModel.find({ survey: surveyId }, 'survey startedAt completedAt').sort({startedAt: 'descending'}).limit(1).exec();
    if(latestAttempt.length === 0) throw new NotFoundError('No attempt found');

    return latestAttempt[0];
}

export async function getExistingAttempt(surveyId: string) {
    const existingAttempt = await getLatestAttempt(surveyId);

    if(!existingAttempt) {
        throw new NotFoundError('Attempt not found');
    }

    if(existingAttempt.completedAt) {
        return null;
    }
    
    return { 
        id: existingAttempt._id,
        survey: existingAttempt.survey,
        startedAt: existingAttempt.startedAt
    };
}

export async function createNewAttempt(surveyId: string, userId: string) {
    const existingAttempt = await getLatestAttempt(surveyId);

    if(!existingAttempt) {
        throw new NotFoundError('Attempt not found');
    }

    if(existingAttempt.completedAt) {
        return;
    }

    const newAttempt = new AttemptModel({
        survey: surveyId,
        startedAt: new Date(),
        user: userId
    });

    await newAttempt.save();

        return { 
        id: newAttempt._id,
        survey: newAttempt.survey,
        startedAt: newAttempt.startedAt
    };
}

export async function deleteAttempt(attemptId: string, userId: string) {
    const existingAttempt = await AttemptModel.findById(attemptId, 'survey startedAt completedAt').exec();

    if(!existingAttempt) {
        throw new NotFoundError('Attempt not found');
    }

    if(existingAttempt.completedAt) {
        throw new InvalidOperationError('Attempt not found');
    }

    if(existingAttempt.user.toString() !== userId) {
        throw new NotFoundError('Attempt not found');
    }

    await AttemptModel.deleteOne({ _id: attemptId }).exec();
    return true;
    
}

export async function completeAttempt(attemptId: string) {
    const existingAttempt = await AttemptModel.findById(attemptId, 'survey startedAt completedAt').exec();

    if(!existingAttempt) {
        throw new NotFoundError('Attempt not found');
    }

    if(existingAttempt?.completedAt) {
        return null;
    }
    
    return { 
        id: existingAttempt._id,
        survey: existingAttempt.survey,
        startedAt: existingAttempt.startedAt,
        completedAt: existingAttempt.completedAt
    };
}