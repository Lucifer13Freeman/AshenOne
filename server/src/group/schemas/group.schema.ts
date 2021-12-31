// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, ObjectId } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { User, UserDocument } from 'src/user/schemas/user.schema';
// import { PostDocument } from 'src/post/schemas/post.schema';


// export type GroupDocument = Group & Document;

// @Schema()
// export class Group
// {
//     @Prop({ 
//         type: String,
//         required: true
//     })
//     name: string;

//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User'/*User.name*/,
//         required: true
//     })
//     user_id: UserDocument; //User;

//     @Prop({ 
//         type: [{ type: mongoose.Schema.Types.ObjectId, 
//                 ref: 'User'/*User.name*/ }],
//         required: true
//     })
//     members: UserDocument[]; //User[];

//     @Prop({
//         type: [{ type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Post' }],
//         required: true,
//         default: []
//     })
//     posts: PostDocument[];

//     @Prop({ 
//         type: Boolean, 
//         required: true,
//         default: true 
//     })
//     is_open: boolean;

//     @Prop({ 
//         type: Boolean, 
//         required: true,
//         default: false 
//     })
//     is_secure: boolean;

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

// export const GroupSchema = SchemaFactory.createForClass(Group);