import { IReaction } from "../../../types/reaction";


interface ReactionItemProps
{
    reaction: IReaction;
}

const ReactionItem: React.FC<ReactionItemProps> = ({ reaction }) => 
{
    return(
        <div>{reaction.content}</div>
    );
}

export default ReactionItem;