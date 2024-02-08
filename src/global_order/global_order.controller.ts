import { Controller, Get } from '@nestjs/common';
import { Global_order } from './global_order.service';

@Controller('global_order')
export class Global_orderController {
  constructor(private readonly appService: Global_order) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
