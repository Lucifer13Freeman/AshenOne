// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, ObjectId } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
// import { Chat, ChatDocument } from '../../chat/schemas/chat.schema';
// import { ReactionDocument } from 'src/chat/schemas/reaction.schema';
// import { PostDocument } from './post.schema';
// import { LikeDocument } from './like.schema';


// export type CommentDocument = Comment & Document;


// @Schema()
// export class Comment
// {
//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Post',
//         required: true
//     })
//     post_id: PostDocument;;

//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true
//     })
//     user_id: UserDocument;

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
//                 ref: 'Like' }]
//     })
//     likes: LikeDocument[];

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


// export const CommentSchema = SchemaFactory.createForClass(Comment);