import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


/*export const CurrentUser = createParamDecorator(
    (data, [root, args, ctx, info]) => ctx.req.user
);*/

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => 
    {
        // const request = context.switchToHttp().getRequest();
        // if (request?.user) return request.user;

        let user = GqlExecutionContext.create(context).getContext().req.user;
        if (user) return user;
        else return context.switchToHttp().getRequest().user
        // else return GqlExecutionContext.create(context).getContext().req.user;
    }
);