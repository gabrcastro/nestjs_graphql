import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsResolver } from './user-settings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettings } from './entities/user-settings.entity';
import { User } from 'src/user/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([UserSettings, User])],
  providers: [UserSettingsResolver, UserSettingsService],
})
export class UserSettingsModule {}
