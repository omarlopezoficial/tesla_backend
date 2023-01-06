import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

 @Post('product')
 @UseInterceptors( FileInterceptor(
  'file',
  { 
    fileFilter: fileFilter,
    //limits: { fileSize: 10000},
    storage: diskStorage(
      {
        destination: './static/products',
        filename: fileNamer
      }
    )
  }
  
  ) )
 uploadProductFile( 
  @UploadedFile()
  file: Express.Multer.File
  ){

    console.log({fileInController : file})

    return {
      fileName: file.originalname,
    };
 }

}
