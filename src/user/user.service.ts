import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
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

    if (!userAdded)
      throw new InternalServerErrorException('Error to create a user');

    return userAdded;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this._repository.find({
      relations: ['settings'],
    });
    return users;
  }

  async findUserById(id: number): Promise<User> {
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
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException(`Error to update a user`);

    await this._repository.update(user, { ...input });
    const userAdded = await this._repository.create({ ...user, ...input });

    return userAdded;
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.findUserById(id);
    if (!user) throw new NotFoundException(`Error to update a user`);

    const deleted = await this._repository.delete(id);
    if (deleted) return true;
    return false;
  }
}
