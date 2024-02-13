import { PartialType } from '@nestjs/mapped-types';
import { CreateSetupSoDto } from './create-setup_so.dto';

export class UpdateSetupSoDto extends PartialType(CreateSetupSoDto) {}
