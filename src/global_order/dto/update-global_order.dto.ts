import { PartialType } from '@nestjs/swagger';
import { CreateGlobalOrderDto } from './create-global_order.dto';

export class UpdateGlobalOrderDto extends PartialType(CreateGlobalOrderDto) {}
