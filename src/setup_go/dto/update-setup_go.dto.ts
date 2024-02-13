import { PartialType } from '@nestjs/mapped-types';
import { CreateSetupGoDto } from './create-setup_go.dto';

export class UpdateSetupGoDto extends PartialType(CreateSetupGoDto) {}
