import { registerEnumType } from '@nestjs/graphql';

export enum CurrencyType {
  EUR,
  USD,
  YEN,
}
registerEnumType(CurrencyType, {
  name: 'Currency',
  description: 'Currency',
});

export enum GenderType {
  MALE,
  FEMALE,
  OTHER,
}
registerEnumType(GenderType, {
  name: 'Gender',
  description: 'The Gender of the User',
});
