import { Injectable } from '@nestjs/common';

@Injectable()
export class Global_order {
  getHello(): string {
    return 'Hello World!';
  }
}
