// import { Body, Query, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
// import { FileFieldsInterceptor } from "@nestjs/platform-express";
// import { ObjectId } from "mongoose";
// import { CommentDto } from "./dto/comment.dto";
// import { TrackDto } from "./dto/track.dto";
// import { TrackService } from "./track.service";

// @Controller('/tracks')
// export class TrackController 
// {
//     constructor(private track_service: TrackService) {}

//     @Post()
//     @UseInterceptors(FileFieldsInterceptor( [
//         { name: 'picture', maxCount: 1 },
//         { name: 'audio', maxCount: 1 },
//     ]))
//     create(@UploadedFiles() files, @Body() dto: TrackDto)
//     {
//         const { picture, audio } = files;
//         return this.track_service.create(dto, picture[0], audio[0]);
//     }

//     @Get()
//     get_all(@Query('count') count: number,
//             @Query('offset') offset: number) 
//     {
//         return this.track_service.get_all(count, offset);
//     }

//     @Get('/search')
//     search(@Query('query') query: string) 
//     {
//         return this.track_service.search(query);
//     }

//     @Get(':id')
//     get(@Param('id') id: ObjectId) 
//     {
//         return this.track_service.get(id);
//     }

//     @Delete(':id')
//     delete(@Param('id') id: ObjectId)
//     {
//         return this.track_service.delete(id);
//     }

//     @Get(':trackId/comment')
//     get_comments(@Param('trackId') trackId: ObjectId) 
//     {
//         return this.track_service.get_comments(trackId);
//     }

//     @Post('/comment')
//     add_comment(@Body() dto: CommentDto)
//     {
//         return this.track_service.add_comment(dto);
//     }

//     @Delete('/comment/:id')
//     delete_comment(@Param('id') id: ObjectId)
//     {
//         return this.track_service.delete_comment(id);
//     } 

//     @Post('/listen/:id')
//     listen(@Param('id') id: ObjectId)
//     {
//         return this.track_service.listen(id);
//     }
// }