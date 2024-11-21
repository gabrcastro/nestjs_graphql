import { Field, Int } from '@nestjs/graphql';
import { CreateUserSettingInput } from './create-user-setting.input';
import { PartialType } from '@nestjs/mapped-types';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserSettingInput extends PartialType(
  CreateUserSettingInput,
) {
  @Field(() => Int)
  id: number;
}
