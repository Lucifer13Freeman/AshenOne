import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { DEFAULT_IMAGES, FileType, REGEXP } from "src/config/configs/consts.config";


@Injectable()
export class FileService 
{
    create_file(type: FileType, file): string
    {
        try 
        {
            console.log(__dirname)

            const extension = file.originalname.split('.').pop();
            const filename = uuid.v4() + '.' + extension;
            const filepath = path.resolve(__dirname, '..', '..', 'static', type);
            
            if(!fs.existsSync(filepath)) fs.mkdirSync(filepath, { recursive: true });
            
            fs.writeFileSync(path.resolve(filepath, filename), file.buffer);

            return type + '/' + filename;
        } 
        catch (err) 
        {
            //throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            console.error(err);
            throw err;
        }
    }

    remove_file(filename: string)
    {
        try 
        {
            if (filename === DEFAULT_IMAGES.NO_AVATAR || 
                filename === DEFAULT_IMAGES.NO_GROUP_AVATAR) return;

            const filepath = path.resolve(__dirname, '..', '..', 'static', filename);

            const filepath_regexp: RegExp = /http(s?):\/\/[-\w\.]{3,}\.[A-Za-z]{2,3}/;
            const is_url = filepath_regexp.test(filepath);
            
            if (is_url) return;

            if (!fs.existsSync(filepath)) return;

            fs.unlinkSync(filepath);

            return;
        } 
        catch (err) 
        {
            console.error(err);
            throw err;
        }
        
    }
}