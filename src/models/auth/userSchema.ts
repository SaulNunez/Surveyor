import { getModelForClass, pre, prop } from "@typegoose/typegoose";
const bcrypt = require('bcryptjs');

@pre<User>('save', async function(next){
if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (err) {
        if(err instanceof Error) {
            return next(err);
        }
        else {
            return next(new Error('An error occurred while hashing the password'));
        }
    }
})

export class User {
    @prop({ type: () => String, required: true, unique: true })
    public email!: string;

    @prop({ type: () => String, required: true})
    public password!: string;
}

export const UserModel = getModelForClass(User);