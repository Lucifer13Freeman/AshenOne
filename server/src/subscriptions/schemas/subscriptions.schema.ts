// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, ObjectId } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { User, UserDocument } from 'src/user/schemas/user.schema';



// export type SubscriptionDocument = Subscription & Document;

// @Schema()
// export class Subscription
// {
//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User'/*User.name*/,
//         required: true
//     })
//     follower: UserDocument; //User;

//     @Prop({ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User'/*User.name*/,
//         required: true
//     })
//     profile: UserDocument;

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


// export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);