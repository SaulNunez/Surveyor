import { InvalidOperationError } from "../models/Errors/invalidOperationError";
import { NotFoundError } from "../models/Errors/notFoundError";
import { Attempt } from "../models/models";

async function getLatestAttempt(surveyId: string) {
    const latestAttempt = await Attempt.find({ survey: surveyId }, 'survey startedAt completedAt').sort({startedAt: 'descending'}).limit(1).exec();
    return latestAttempt.length ? latestAttempt[0] : null;
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
        survey: existingAttempt.survey._id,
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

    const newAttempt = new Attempt({
        survey: surveyId,
        startedAt: new Date(),
        user: userId
    });

    await newAttempt.save();

        return { 
        id: newAttempt._id,
        survey: newAttempt.survey._id,
        startedAt: newAttempt.startedAt
    };
}

export async function deleteAttempt(attemptId: string, userId: string) {
    const existingAttempt = await Attempt.findById(attemptId, 'survey startedAt completedAt').exec();

    if(!existingAttempt) {
        throw new NotFoundError('Attempt not found');
    }

    if(existingAttempt.completedAt) {
        throw new InvalidOperationError('Attempt not found');
    }

    if(existingAttempt.user.toString() !== userId) {
        throw new NotFoundError('Attempt not found');
    }

    if(existingAttempt) {
        await Attempt.deleteOne({ _id: attemptId }).exec();
        return true;
    }
}

export async function completeAttempt(attemptId: string) {
    const existingAttempt = await Attempt.findById(attemptId, 'survey startedAt completedAt').exec();

    if(!existingAttempt) {
        throw new NotFoundError('Attempt not found');
    }

    if(existingAttempt?.completedAt) {
        return null;
    }
    
    return { 
        id: existingAttempt._id,
        survey: existingAttempt.survey._id,
        startedAt: existingAttempt.startedAt,
        completedAt: existingAttempt.completedAt
    };
}