import { BadRequestException } from '@nestjs/common/exceptions';



export const fileFilter = (res: Express.Request, file: Express.Multer.File, callback: Function) => {

    console.log({file});

    if(!file) return callback(new Error('File is empty'),false);

    const fileExptension = file.mimetype.split('/')[1];
    const validExptensions = ['jpg','jpeg','png','gif'];

    if ( validExptensions.includes(fileExptension) ){
        return callback(null,true);
    }

    if ( !file ){
        throw new BadRequestException(`Make sure that file is an image`);
    }
    
    callback(null,false);
}