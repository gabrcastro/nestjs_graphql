import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { usersMock } from 'src/__mocks__/user.mock';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _repository: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    const user = await this._repository.create({
      name: input.name,
      email: input.email,
    });
    const userAdded = await this._repository.save(user);

    return userAdded;
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this._repository.find({
      relations: ['settings'],
    });
    return users;
  }

  async getOne(id: number): Promise<User> {
    const user: User = await this._repository.findOne({
      where: {
        id: id,
      },
      relations: ['settings'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, input: UpdateUserInput): Promise<User> {
    const result = await this._repository.update(id, { ...input });
    return result.raw;
  }

  async delete(id: number): Promise<string> {
    await this._repository.delete(id);
    return 'User deleted';
  }
}
