import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserSettingInput {
  @Field((type) => Int)
  userId: number;

  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
