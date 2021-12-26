require('dotenv').config();
//import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie_parser from 'cookie-parser';
import { AppConfigService } from './config/app-config.service';
import { PrismaService } from './prisma/prisma.service';
import * as csurf from 'csurf';
import { graphqlUploadExpress } from 'graphql-upload';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


const start = async () => 
{
    try 
    {
        const app = await NestFactory.create(AppModule);//await NestFactory.create<NestExpressApplication>(AppModule);//
        
        //app.useStaticAssets(join(__dirname, '..', 'static'));

        app.use(cookie_parser());
        app.enableCors({ origin: true, credentials: true });
        // app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
        
        //app.useGlobalPipes(new ValidationPipe());

        //app.useStaticAssets(join(__dirname, '..', 'static'), { prefix: '/static/' });

        const app_config = app.get<AppConfigService>(AppConfigService);
        const PORT = app_config.port || 5000; //process.env.PORT || 5000;

        const prismaService: PrismaService = app.get(PrismaService);
        prismaService.enableShutdownHooks(app)

        //app.use(csurf());

        await app.listen(PORT, () => console.log(`🚀 Server started on PORT: ${PORT}`));
    } 
    catch (e) 
    {
        console.log(e);
    }
}

start();

// const start1 = async () => 
// {
//     try 
//     {
//         const PORT = 5001;
//         const app = await NestFactory.create(AppModule);
        
//         app.use(cookie_parser());
//         app.enableCors({ origin: true, credentials: true });
        
//         //app.useGlobalPipes(new ValidationPipe());
        
//         await app.listen(PORT, () => console.log(`🚀 Server started on PORT: ${PORT}`));
//     } 
//     catch (e) 
//     {
//         console.log(e);
//     }
// }

// start1();