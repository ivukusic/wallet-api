import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmailTransformPipe implements PipeTransform {
  transform(value: any) {
    if (value?.email) {
      const newValue = { ...value };
      newValue.email = newValue.email.trim().toLowerCase();
      return newValue;
    }
    return value;
  }
}
