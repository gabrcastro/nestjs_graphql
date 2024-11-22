import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSettingInput } from './dto/create-user-setting.input';
import { UpdateUserSettingInput } from './dto/update-user-setting.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSettings } from './entities/user-settings.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from '../user/entities/user';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private _repository: Repository<UserSettings>,
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async create(input: CreateUserSettingInput): Promise<UserSettings> {
    const user = await this._userRepository.findOne({
      where: { id: input.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const userSettings = this._repository.create(input);
    const userSettingsAdded = this._repository.save(userSettings);
    user.settings = userSettings;
    await this._userRepository.save(user);
    return userSettingsAdded;
  }

  async getOne(id: number): Promise<UserSettings> {
    const userSettings = await this._repository.findOne({
      where: { userId: id },
    });
    if (!userSettings) {
      throw new NotFoundException(`User settings not found`);
    }
    return userSettings;
  }

  async update(input: UpdateUserSettingInput): Promise<UserSettings> {
    const userSettings = await this._repository.findOne({
      where: { userId: input.id },
    });
    if (!userSettings) {
      throw new NotFoundException(`User settings not found`);
    }
    const userSettingsUpdated = await this._repository.update(input.id, {
      ...input,
    });
    return userSettingsUpdated.raw;
  }

  async remove(id: number): Promise<string> {
    await this._repository.delete(id);
    return 'User settings with id ${id} was removed';
  }
}
