import { Injectable } from '@nestjs/common';

@Injectable()
export class MainDatasService {
  findAll() {
    return `This action returns all mainDatas`;
  }
}
