import { getModelForClass, pre, prop, Ref } from "@typegoose/typegoose";
import { User } from "./userSchema";
import { Client } from "./clientSchema";
const bcrypt = require('bcrypt');

@pre<RefreshToken>('save', async function(next){
if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.token, salt);
        this.token = hash;
        next();
    } catch (err) {
        if(err instanceof Error) {
            return next(err);
        }
        else {
            return next(new Error('An error occurred while hashing the token'));
        }
    }
})

export class RefreshToken {
    @prop({ required: true})
    public token!: string;

    @prop({ required: true, ref: () => User, type: () => String})
    public userId!: Ref<User, string>;

    @prop({ required: true})
    public expiryDate!: Date;

    @prop({ required: true, ref: () => Client, type: () => String})
    public clientId!: Ref<Client, string>;
}

export const RefreshTokenModel = getModelForClass(RefreshToken)