import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { S_sor_Dto } from './dto/s_sor.dto';
import { S_sor } from '../entities/Setup/Associations/S_sor';

import { SetupSoDto } from '../setupSubOrder/dto/setupSubOrder.dto';
import { SetupSubOrderService } from '../setupSubOrder/setupSubOrder.service';

@Injectable()
export class S_sor_Service {
  constructor(
    @InjectRepository(S_sor)
    private ssorRepository: Repository<S_sor>,
    private setupSoService: SetupSubOrderService,
  ) {}
  create(createSsDto: S_sor_Dto[]): Promise<SetupSoDto[]> {
    try {
      //first i delete all the Sso with the same sub order id
      const listIsReset = this.deleteAllSsBySubOrderId(
        createSsDto[0].s_sor_subOrder_id,
      );
      if (!listIsReset)
        throw new Error('Error while deleting the Sso with the same order id');
      if (createSsDto.length > 0) {
        //creation of the new Sso
        // Wait for all save operations to complete before returning the list of setups used
        let subOrderId = createSsDto[0].s_sor_subOrder_id;
        return Promise.all(
          createSsDto.map((ss_So) => {
            const newSgGo = this.ssorRepository.create(ss_So);

            return this.ssorRepository.save(newSgGo);
          }),
        ).then(() => {
          //return the list created
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
      const listSsoBySubOrderId: Array<S_sor_Dto> =
        await this.ssorRepository.find({
          where: { s_sor_subOrder_id: subOrderId },
        });
      if (listSsoBySubOrderId.length > 0) {
        listSsoBySubOrderId.forEach((ss_So) => {
          this.ssorRepository.delete(ss_So.s_sor_id);
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
    return this.ssorRepository.find();
  }

  public async findAllBySubOrderId(globalOrderId: number) {
    const listSsBySubOrderId = await this.ssorRepository.find({
      where: { s_sor_subOrder_id: globalOrderId },
    });
    let listSetupSoBySubOrder: Array<SetupSoDto> = [];
    if (listSsBySubOrderId.length > 0) {
      //for each ss i get the setupso data
      for (const ss of listSsBySubOrderId) {
        const setupData: SetupSoDto = await this.setupSoService.findOne(
          ss.s_sor_setupSubOrder_id,
        );
        //if listSetupCategoriesBySubOrder doesnt contain the setup category, i add it
        if (
          !listSetupSoBySubOrder.some(
            (setup) => setup.setupSubOrder_id === setupData.setupSubOrder_id,
          )
        )
          listSetupSoBySubOrder.push(setupData);
      }
    }
    return listSetupSoBySubOrder;
  }

  findOne(id: number) {
    return this.ssorRepository.findOneBy({ s_sor_id: id });
  }

  update(id: number, updateSetupSoDto: S_sor_Dto) {
    return this.ssorRepository.update(id, updateSetupSoDto);
  }

  remove(id: number) {
    return this.ssorRepository.delete(id);
  }

  async removeAllBySubOrderId(subOrderId: number): Promise<boolean> {
    try {
      const allSsoAreRemoved = await this.ssorRepository.delete({
        s_sor_subOrder_id: subOrderId,
      });
      if (allSsoAreRemoved.affected > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }
}
