import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettings } from 'src/user-settings/entities/user-settings.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field({ nullable: true })
  email?: string;

  @OneToOne(() => UserSettings) //, { cascade: true, onDelete: 'CASCADE' }
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSettings;
}
