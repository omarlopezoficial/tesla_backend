import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const GetRawHeaders = createParamDecorator(
    (data:string, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest();
        const user = req.rawHeaders;

        if (!user)
            throw new InternalServerErrorException('User not found (request)');

        return (!data) ? user : user[data];
    }
);