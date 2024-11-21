import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import { User } from './entities/user';
import { usersMock } from 'src/__mocks__/user.mock';
import { userSettingsMock } from 'src/__mocks__/user-settings.mock';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { NotFoundException } from '@nestjs/common';
import { UserSettings } from 'src/user-settings/entities/user-settings.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers() {
    return this.userService.getAll();
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(@Args('data') input: UpdateUserInput) {
    return this.userService.update(input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }
}
