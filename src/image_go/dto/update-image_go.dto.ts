import { PartialType } from '@nestjs/mapped-types';
import { CreateImageGoDto } from './create-image_go.dto';

export class UpdateImageGoDto extends PartialType(CreateImageGoDto) {}
