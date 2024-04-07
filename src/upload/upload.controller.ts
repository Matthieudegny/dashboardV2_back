import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
  Delete,
  Query,
  Req,
  UploadedFiles,
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
  @Post(':folder')
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
          let namefolder = req.params.folder || 'default';
          //in case of suborder
          if (namefolder.includes('-'))
            namefolder = namefolder.replace('-', '/');

          const destPath = path.resolve(
            'C:/Users/PC/Documents/code/code project/finance dashboard projet/dashboard/Images',
            namefolder,
          );
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          cb(null, destPath);
        },
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  //Architectur storage=
  //folder global order's name = NameAsset_globalOrderId
  //image global order name = titleimage
  //image global order path = NameAsset_globalOrderId/titleimage
  //folder subOrder's name = Asset_globalOrderId/subOrder_subOrderId
  //folder subOrder's path = Asset_globalOrderId/subOrder_subOrderId
  //image subOrder's name = titleimage_imgaeId
  //image subOrder's path = Asset_globalOrderId/subOrder_subOrderId/titleimage_imgaeId
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    try {
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
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
