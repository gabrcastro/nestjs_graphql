import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettings } from 'src/user-settings/entities/user-settings.entity';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  settings?: UserSettings;
}
