import { Field, InputType, ID } from '@nestjs/graphql';
// import { Upload } from 'src/graphql/scalars/file.scalar';
import { GraphQLUpload, FileUpload } from "graphql-upload";


@InputType()
export class UpdateUserInput 
{
    @Field(() => ID, { nullable: true })
    readonly id?: string;//ObjectId;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;//ObjectId;

    @Field({ nullable: true })
    readonly username?: string;

    @Field({ nullable: true })
    readonly email?: string;

    @Field({ nullable: true })
    readonly password?: string;

    @Field({ nullable: true })
    readonly confirm_password?: string;

    @Field(() => GraphQLUpload, { nullable: true })
    readonly avatar?: FileUpload;
}