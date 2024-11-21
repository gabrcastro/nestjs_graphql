import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { usersMock } from 'src/__mocks__/user.mock';

@Injectable()
export class UserService {
  create(input: CreateUserInput) {
    const newUser = {
      id: usersMock.length + 1,
      name: input.name,
      email: input.email,
    };

    usersMock.push(newUser);

    return newUser;
  }

  getAll() {
    return usersMock;
  }

  getOne(id: number) {
    return usersMock.find((user) => user.id === id);
  }

  update(input: UpdateUserInput) {
    const index = usersMock.findIndex((user) => user.id === input.id);
    const updatedUser = { ...input };
    usersMock[index] = { ...usersMock[index], ...updatedUser };

    return usersMock[index];
  }

  delete(id: number) {
    const index = usersMock.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    usersMock.splice(index, 1);

    return true;
  }
}
