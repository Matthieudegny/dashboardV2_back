import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SsoDto } from './dto/sso.dto';
import { Ss_So } from '../entities/Setup/Associations/Ss';

import { SetupSoDto } from '../setup_so/dto/setupSo.dto';
import { SetupSoService } from '../setup_so/setupSo.service';

@Injectable()
export class SsoService {
  constructor(
    @InjectRepository(Ss_So)
    private ssoRepository: Repository<Ss_So>,
    private setupSoService: SetupSoService,
  ) {}
  create(createSsDto: SsoDto[]): Promise<SetupSoDto[]> {
    try {
      //first i delete all the sg_Go with the same sub global order id
      const listIsReset = this.deleteAllSsBySubOrderId(
        createSsDto[0].sso_so_id,
      );
      if (!listIsReset)
        throw new Error(
          'Error while deleting the sg_Go with the same global order id',
        );
      // Wait for all save operations to complete before returning the list of setups used
      if (createSsDto.length > 0) {
        let subOrderId = createSsDto[0].sso_so_id;
        return Promise.all(
          createSsDto.map((ss_So) => {
            const newSgGo = this.ssoRepository.create(ss_So);

            return this.ssoRepository.save(newSgGo);
          }),
        ).then(() => {
          return this.findAllBySubOrderId(subOrderId);
        });
      }
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async deleteAllSsBySubOrderId(subOrderId: number): Promise<boolean> {
    try {
      const listSg_GoBySubOrderId: Array<SsoDto> =
        await this.ssoRepository.find({
          where: { sso_so_id: subOrderId },
        });
      if (listSg_GoBySubOrderId.length > 0) {
        listSg_GoBySubOrderId.forEach((ss_So) => {
          this.ssoRepository.delete(ss_So.sso_so_id);
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  // async findAllSetupSoBySubOrderId(subOrderId: number) {
  //   try {
  //     const listSs_SoByGlobalOrderId: Array<Ss_SoDto> =
  //       await this.ssRepository.find({
  //         where: { ss_so_so_id: subOrderId },
  //       });

  //     let listSetupSoByGlobalSubOrder: Array<SetupSoDto> = [];
  //     if (listSs_SoByGlobalOrderId.length > 0) {
  //       //for each sg_Go i get the setup category data
  //       for (const ss_So of listSs_SoByGlobalOrderId) {
  //         const setupData: SetupSoDto = await this.setupSoService.findOne(
  //           ss_So.ss_so_setup_so_id,
  //         );
  //         //if listSetupCategoriesByGlobalOrder doesnt contain the setup category, i add it
  //         if (
  //           !listSetupSoByGlobalSubOrder.some(
  //             (setup) => setup.setup_so_id === setupData.setup_so_id,
  //           )
  //         )
  //           listSetupSoByGlobalSubOrder.push(setupData);
  //       }
  //     }

  //     return listSetupSoByGlobalSubOrder;
  //   } catch (error) {
  //     console.log('error', error);
  //     throw new Error(error);
  //   }
  // }

  findAll() {
    return this.ssoRepository.find();
  }

  public async findAllBySubOrderId(globalOrderId: number) {
    const listSsBySubOrderId = await this.ssoRepository.find({
      where: { sso_so_id: globalOrderId },
    });
    let listSetupSoBySubOrder: Array<SetupSoDto> = [];
    if (listSsBySubOrderId.length > 0) {
      //for each ss i get the setupso data
      for (const ss of listSsBySubOrderId) {
        const setupData: SetupSoDto = await this.setupSoService.findOne(
          ss.sso_setup_so_id,
        );
        //if listSetupCategoriesBySubOrder doesnt contain the setup category, i add it
        if (
          !listSetupSoBySubOrder.some(
            (setup) => setup.setup_so_id === setupData.setup_so_id,
          )
        )
          listSetupSoBySubOrder.push(setupData);
      }
    }
    return listSetupSoBySubOrder;
  }

  findOne(id: number) {
    return this.ssoRepository.findOneBy({ sso_id: id });
  }

  update(id: number, updateSetupSoDto: SsoDto) {
    return this.ssoRepository.update(id, updateSetupSoDto);
  }

  remove(id: number) {
    return this.ssoRepository.delete(id);
  }
}
