import { PartialType } from '@nestjs/mapped-types';
import { CreateMainDataDto } from './create-main-data.dto';

export class UpdateMainDataDto extends PartialType(CreateMainDataDto) {}
