import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

//pipes = middleware pour le controller
//middleware pour le module avant datteindre le controller
@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe!');
    //metadata permet davoir des informations sur la requête
    console.log(metadata);

    const parseAgeToInt = parseInt(value.age.toString());
    if (isNaN(parseAgeToInt)) {
      console.log('Age is not a number');
      throw new Error('Age is not a number');
    }
    return value;
  }
}
