import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserSettings {
  @PrimaryColumn()
  @Field((type) => Int)
  userId: number;

  @Column()
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column()
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
