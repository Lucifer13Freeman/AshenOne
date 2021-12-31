// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, ObjectId } from 'mongoose';
// import * as mongoose from 'mongoose';


// /*enum Roles 
// {
//     ADMIN = 'ADMIN',
//     USER = 'USER'
// }*/


// export type UserDocument = User & Document;

// @Schema()
// export class User
// {
//     // @Prop({
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     required: true
//     // })
//     // _id: ObjectId;

//     @Prop({
//         type: String,
//         required: true
//     })
//     username: string;

//     @Prop({
//         type: String,
//         required: true,
//         unique: true
//     })
//     email: string;
    
//     @Prop({
//         type: String,
//         required: true,
//         select: false
//     })
//     password: string;
  
//     @Prop({ 
//         type: String,
//         required: true,
//         default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
//     })
//     avatar: string;
  
//     @Prop({ 
//         type: String, 
//         required: true,
//         default: 'USER' 
//     })
//     role: string;

//     // @Prop({ 
//     //     type: Boolean,
//     //     required: true,
//     //     default: false
//     // })
//     // is_follow: Boolean;

//     @Prop({ 
//         type: Date, 
//         required: true,
//         default: Date.now 
//     })
//     created_at: Date;

//     @Prop({ 
//         type: Date, 
//         required: true, 
//         default: Date.now 
//     })
//     updated_at: Date;
// }

// export const UserSchema = SchemaFactory.createForClass(User);