import { PartialType } from '@nestjs/mapped-types';
import { CreateFailureSoDto } from './create-failure_so.dto';

export class UpdateFailureSoDto extends PartialType(CreateFailureSoDto) {}
