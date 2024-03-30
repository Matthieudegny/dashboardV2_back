import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from '../public.decorator';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { UploadService } from './upload.service';

@ApiTags('Upload Image')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post(':folder/:name')
  //middleware to upload file
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      //storage = indication of where to store the file
      storage: diskStorage({
        //destination = where to store the file
        //exemple request will be upload/NameFolder/NameFile
        //NameFolder can contain a - , that would represent a sub folder for the suborders
        //- will be remplace with / to create the subfolder
        destination: (req, file, cb) => {
          console.log('req.params', req.params);
          let folder: string = req.params.folder || 'default';
          console.log('category', folder);
          if (folder.includes('-')) folder = folder.replace('-', '/');
          console.log('category', folder);
          const destPath = path.resolve(
            'C:/Users/PC/Documents/code/code project/finance dashboard projet/dashboard/Images',
            folder,
          );
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          cb(null, destPath);
        },
        //filename = how to name the file
        // filename: (req, file, cb) => {
        //   const name: string = req.params.name || 'default';
        //   console.log('name', name);
        //   const fileName: string =
        //     path.parse(file.originalname).name.replace(/\s+/g, '-') +
        //     '-' +
        //     Date.now();
        //   console.log('fileName', fileName);
        //   const extension: string = path.parse(file.originalname).ext;
        //   cb(null, `${name}${extension}`);
        // },
        filename: (req, file, cb) => {
          const index = Array.isArray(req.files)
            ? req.files.findIndex((f) => f.fieldname === file.fieldname)
            : -1;

          const name: string = req.params.name || 'default';
          console.log('name', name);
          const fileName: string =
            path.parse(file.originalname).name.replace(/\s+/g, '-') +
            '-' +
            index +
            '-' +
            Date.now();
          console.log('fileName', fileName);
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() files: Express.Multer.File[]) {
    console.log('file', files);
    return true;
  }

  @Delete(':fileName')
  deleteImage(@Param('fileName') fileName: string): string {
    console.log('delete image');
    const filePath = `C:/Users/PC/Documents/code/code project/finance dashboard projet/dashboard/Images/Images/${fileName}`; // Chemin vers le dossier où se trouve l'image à supprimer
    console.log('filePath', filePath);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return 'Image supprimée avec succès';
      } else {
        return "L'image n'existe pas";
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'image:", err);
      return "Erreur lors de la suppression de l'image";
    }
  }
}
