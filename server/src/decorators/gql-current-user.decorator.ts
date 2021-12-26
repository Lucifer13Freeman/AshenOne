import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


/*export const CurrentUser = createParamDecorator(
    (data, [root, args, ctx, info]) => ctx.req.user
);*/

export const GqlCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => 
  {
      //console.log(GqlExecutionContext.create(context).getContext().req.user);
     
      /*const { id, email, username } = GqlExecutionContext.create(context).getContext().req.user;
      
      return {
        id,
        email,
        username
      }*/

    return GqlExecutionContext.create(context).getContext().req.user;
  }
);