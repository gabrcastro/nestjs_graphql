import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserSettingInput } from './dto/create-user-setting.input';
import { UpdateUserSettingInput } from './dto/update-user-setting.input';
import { userSettingsMock } from 'src/__mocks__/user-settings.mock';

@Injectable()
export class UserSettingsService {
  create(input: CreateUserSettingInput) {
    const newUserSettings = {
      userId: input.userId,
      receiveNotifications: input.receiveNotifications,
      receiveEmails: input.receiveEmails,
    };

    userSettingsMock.push(newUserSettings);

    return newUserSettings;
  }

  getOne(id: number) {
    const userSettings = userSettingsMock.find(
      (userSettings) => userSettings.userId === id,
    );
    if (!userSettings) {
      throw new NotFoundException(`User settings not found`);
    }

    return userSettings;
  }

  update(input: UpdateUserSettingInput) {
    const index = userSettingsMock.findIndex(
      (userSettings) => userSettings.userId === input.userId,
    );

    if (index === -1) {
      throw new NotFoundException(`User settings not found`);
    }

    const updatedUserSettings = { ...input };
    userSettingsMock[index] = {
      ...userSettingsMock[index],
      ...updatedUserSettings,
    };

    return userSettingsMock[index];
  }

  remove(id: number) {
    const index = userSettingsMock.findIndex(
      (userSettings) => userSettings.userId === id,
    );

    if (index === -1) {
      throw new NotFoundException(`User settings with id ${id} not found`);
    }

    userSettingsMock.splice(index, 1);

    return true;
  }
}
