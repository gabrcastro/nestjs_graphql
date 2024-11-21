import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserSettingsService } from './user-settings.service';
import { CreateUserSettingInput } from './dto/create-user-setting.input';
import { UpdateUserSettingInput } from './dto/update-user-setting.input';
import { UserSettings } from './entities/user-settings.entity';

@Resolver(() => UserSettings)
export class UserSettingsResolver {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Mutation(() => UserSettings)
  createUserSettings(
    @Args('data')
    input: CreateUserSettingInput,
  ) {
    return this.userSettingsService.create(input);
  }

  @Query(() => UserSettings)
  getOneUserSettings(@Args('userId') userId: number) {
    return this.userSettingsService.getOne(userId);
  }

  @Mutation(() => UserSettings)
  updateUserSettings(
    @Args('data')
    input: UpdateUserSettingInput,
  ) {
    return this.userSettingsService.update(input);
  }

  @Mutation(() => String)
  removeUserSettings(@Args('id', { type: () => Int }) id: number) {
    return this.userSettingsService.remove(id);
  }
}
