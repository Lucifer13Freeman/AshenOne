// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { UserDocument } from 'src/user/schemas/user.schema';
// import { CommentDocument } from 'src/track/schemas/comment.schema';
// import { LikeDocument } from './like.schema';


// export type PostDocument = Post & Document;


// @Schema()
// export class Post
// {
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

//     // @Prop({
//     //     type: [{ type: mongoose.Schema.Types.ObjectId, 
//     //             ref: 'Reaction' }],
//     //     required: false
//     // })
//     // reactions: ReactionDocument[];

//     // @Prop({
//     //     type: Number,
//     //     required: true,
//     //     default: 0
//     // })
//     // likes: number

//     @Prop({ 
//         type: [{ type: mongoose.Schema.Types.ObjectId, 
//                 ref: 'Like' }]
//     })
//     likes: LikeDocument[];

//     @Prop({ 
//         type: [{ type: mongoose.Schema.Types.ObjectId, 
//                 ref: 'Comment' }]
//     })
//     comments: CommentDocument[];

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


// export const PostSchema = SchemaFactory.createForClass(Post);