// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, ObjectId } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { UserDocument } from 'src/user/schemas/user.schema';
// import { PostDocument } from './post.schema';


// export type LikeDocument = Like & Document;


// @Schema()
// export class Like
// {
//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Post',
//         required: true
//     })
//     post_id: PostDocument;

//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//         required: true
//     })
//     user_id: UserDocument;

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


// export const LikeSchema = SchemaFactory.createForClass(Like);