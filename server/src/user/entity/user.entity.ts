// //import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // import { Document, ObjectId } from 'mongoose';
// // import * as mongoose from 'mongoose';
// import { Entity, Column, ObjectID, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


// /*enum Roles 
// {
//     ADMIN = 'ADMIN',
//     USER = 'USER'
// }*/


// //export type UserDocument = User & Document;

// @Entity()
// export class User
// {
//     // @Prop({
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     required: true
//     // })
//     // _id: ObjectId;

//     @ObjectIdColumn() 
//     id: ObjectID;

//     // @Prop({
//     //     type: String,
//     //     required: true
//     // })
//     @Column({
//         type: String,
//         nullable: false
//     })
//     username: string;

//     // @Prop({
//     //     type: String,
//     //     required: true,
//     //     unique: true
//     // })
//     @Column({
//         type: String,
//         nullable: false,
//         unique: true
//     })
//     email: string;
    
//     // @Prop({
//     //     type: String,
//     //     required: true,
//     //     select: false
//     // })
//     @Column({
//         type: String,
//         nullable: false,
//         select: false
//     })
//     password: string;
  
//     // @Prop({ 
//     //     type: String,
//     //     required: true,
//     //     default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
//     // })
//     @Column({
//         type: String,
//         nullable: false,
//         default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
//     })
//     avatar: string;
  
//     // @Prop({ 
//     //     type: String, 
//     //     required: true,
//     //     default: 'USER' 
//     // })
//     @Column({
//         type: String,
//         nullable: false,
//         default: 'USER'
//     })
//     role: string;

//     // @Prop({ 
//     //     type: Boolean,
//     //     required: true,
//     //     default: false
//     // })
//     // is_follow: Boolean;

//     // @Prop({ 
//     //     type: Date, 
//     //     required: true,
//     //     default: Date.now 
//     // })
//     @CreateDateColumn({ 
//         //type: 'timestamp',
//         type: Date,
//         nullable: false,
//         default: new Date()
//     })
//     created_at: Date;

//     // @Prop({ 
//     //     type: Date, 
//     //     required: true, 
//     //     default: Date.now 
//     // })
//     @UpdateDateColumn({
//         type: Date,
//         nullable: false,
//         default: new Date()
//     })
//     updated_at: Date;
// }


// //export const UserSchema = SchemaFactory.createForClass(User);