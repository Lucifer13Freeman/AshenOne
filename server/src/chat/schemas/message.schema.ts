// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
// import { Chat, ChatDocument } from '../../chat/schemas/chat.schema';
// import { Reaction, ReactionDocument } from './reaction.schema';


// export type MessageDocument = Message & Document;

// @Schema()
// export class Message
// {
//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Chat',
//         required: true
//     })
//     chat_id: ChatDocument; //Chat;

//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true
//     })
//     user_id: UserDocument; //User;

//     @Prop({
//         type: String,
//         required: true
//     })
//     text: string;

//     @Prop({
//         type: String,
//         required: false
//     })
//     image: string;

//     @Prop({
//         type: String,
//         required: false
//     })
//     audio: string;

//     @Prop({
//         type: String,
//         required: false
//     })
//     video: string;

//     @Prop({
//         type: [{ type: mongoose.Schema.Types.ObjectId, 
//                 ref: 'Reaction' }],
//         required: false
//     })
//     reactions: ReactionDocument[]; //Reaction[];

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

// export const MessageSchema = SchemaFactory.createForClass(Message);