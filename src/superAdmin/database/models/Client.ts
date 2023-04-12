import mongoose, { Schema } from "mongoose";


export interface SuperAdminAttributes {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    address: string,
    salt: string,
    verified: boolean
}

const SuperAdminInstance = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, require: true }, 
    phone: { type: String },
    password: String,
    address: String,
    salt: String,
    verified: {type: Boolean, default: "false" }

},
    {
        toJSON: {
            transform(doc, ret){
                delete ret.password
                delete ret.salt
            }
        },
        timestamps: true
    
})



export const SuperAdminModel = mongoose.model<SuperAdminAttributes>("super", SuperAdminInstance);