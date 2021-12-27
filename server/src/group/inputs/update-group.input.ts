import { InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class UpdateGroupInput 
{
    @Field(() => ID)
    readonly id: string;

    @Field(() => ID, { nullable: true })
    readonly current_user_id?: string;

    @Field()
    readonly name?: string;

    @Field({ nullable: true })
    readonly avatar?: string;

    // @Field({ nullable: true })
    // readonly is_my?: boolean;

    @Field({ nullable: true })
    readonly add_moderator_id?: string;

    @Field({ nullable: true })
    readonly remove_moderator_id?: string;

    @Field({ nullable: true })
    readonly is_private?: boolean;

    @Field({ nullable: true })
    readonly is_secure?: boolean;
}