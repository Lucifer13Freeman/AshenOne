// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model, ObjectId } from "mongoose";
// import { FileService, FileType } from "src/file/file.service";
// import { CommentDto } from "./dto/comment.dto";
// import { TrackDto } from "./dto/track.dto";
// import { Comment, CommentDocument } from "./schemas/comment.schema";
// import { Track, TrackDocument } from "./schemas/track.schema";

// @Injectable()
// export class TrackService
// {
//     constructor(@InjectModel(Track.name) 
//                 private trackModel: Model<TrackDocument>,

//                 @InjectModel(Comment.name) 
//                 private commentModel: Model<CommentDocument>,

//                 private file_service: FileService) {}

//     async create(dto: TrackDto, picture, audio): Promise<Track> 
//     {
//         const audiopath = this.file_service.create_file(FileType.AUDIO, audio);
//         const picturepath = this.file_service.create_file(FileType.IMAGE, picture);
        
//         const track = await this.trackModel.create(
//         { 
//             ...dto, 
//             listens: 0, 
//             audio: audiopath, 
//             picture: picturepath 
//         });

//         return track;
//     }

//     async get_all(count = 10, offset = 0): Promise<Track[]>
//     {
//         const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));
//         return tracks;
//     }

//     async get(id: ObjectId): Promise<Track>
//     {
//         const track = await this.trackModel.findById(id).populate('comments');
//         return track;
//     }

//     async search(query: string): Promise<Track[]>
//     {
//         const tracks = await this.trackModel.find(
//         {
//             name: { $regex: new RegExp(query, 'i')}
//         });
//         return tracks;
//     }

//     async delete(id: ObjectId): Promise<ObjectId> 
//     {
//         const track = await this.trackModel.findByIdAndDelete(id);

//         this.file_service.remove_file(track.audio);
//         this.file_service.remove_file(track.picture);

//         return track._id;
//     }

//     async get_comments(trackId: ObjectId): Promise<globalThis.Comment[]>
//     {
//         const track = await this.trackModel.findById(trackId).populate('comments');
//         const comments = track.comments;

//         return comments;
//     }

//     async add_comment(dto: CommentDto): Promise<Comment>
//     {
//         const track = await this.trackModel.findById(dto.trackId);
//         const comment = await this.commentModel.create({ ...dto });

//         track.comments.push(comment._id);
//         await track.save();

//         return comment;
//     }

//     async delete_comment(id: ObjectId): Promise<ObjectId> 
//     {
//         const comment = await this.commentModel.findByIdAndDelete(id);
//         return comment._id;
//     }

//     async listen(id: ObjectId) 
//     {
//         const track = await this.trackModel.findById(id);
//         track.listens++;
//         track.save();
//     }
// }