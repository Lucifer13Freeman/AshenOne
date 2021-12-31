// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, ObjectId } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
// import { Message, MessageDocument } from './message.schema';


// export type ReactionDocument = Reaction & Document;

// @Schema()
// export class Reaction
// {
//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true
//     })
//     user_id: UserDocument; //ObjectId;//User;

//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Message',
//         required: true
//     })
//     message_id: ObjectId; //MessageDocument; //Message;

//     @Prop({
//         type: String,
//         required: true
//     })
//     content: string;

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

// export const ReactionSchema = SchemaFactory.createForClass(Reaction);