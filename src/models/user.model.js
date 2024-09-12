import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// import mongoosePaginate from 'mongoose-paginate-v2';
// import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const schema = mongoose.Schema;

const userSchema = new schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            index: true, // Indexing phone
        },
        dob: {
            type: Date,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true, // Indexing email
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, autoIndex: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    return next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    let update = { ...this.getUpdate() };
    if (update.password) {
        update.password = await bcrypt.hashSync(this.getUpdate().password, bcrypt.genSaltSync(10));
        this.setUpdate(update);
    }
    return next();
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
