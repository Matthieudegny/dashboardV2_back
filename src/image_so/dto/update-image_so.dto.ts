import { PartialType } from '@nestjs/mapped-types';
import { CreateImageSoDto } from './create-image_so.dto';

export class UpdateImageSoDto extends PartialType(CreateImageSoDto) {}
