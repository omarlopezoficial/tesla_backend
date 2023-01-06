import { BadRequestException } from '@nestjs/common/exceptions';



export const fileNamer = (res: Express.Request, file: Express.Multer.File, callback: Function) => {

    console.log({file});

    if(!file) return callback(new Error('File is empty'),false);

   const fileExtension = file.mimetype.split('/')[1];

   const fileName = `HolaMundo.${ fileExtension }`;
    
    callback(null,fileName);
}