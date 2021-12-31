import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


/*export const CurrentUser = createParamDecorator(
    (data, [root, args, ctx, info]) => ctx.req.user
);*/

export const Token = createParamDecorator(
    (data: unknown, context: ExecutionContext) => 
    {
      //console.log(GqlExecutionContext.create(context).getContext().req.user);
     
      const token = GqlExecutionContext.create(context).getContext().req.headers.authorization.split('Bearer ')[1];
      
      //console.log(token)
      
      return {
        token
      }

      //return GqlExecutionContext.create(context).getContext().req.user;
    }
);