import { PipeTransform, Pipe, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Pipe()
export class SignaturePipe implements PipeTransform<any> {
    async transform(value, metadata: ArgumentMetadata) {

      console.log('value: ',value);
      console.log('metadata: ',metadata);

      return value;
    }
}