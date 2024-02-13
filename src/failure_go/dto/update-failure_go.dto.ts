import { PartialType } from '@nestjs/mapped-types';
import { CreateFailureGoDto } from './create-failure_go.dto';

export class UpdateFailureGoDto extends PartialType(CreateFailureGoDto) {}
