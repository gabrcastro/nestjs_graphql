import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserSettings } from 'src/user-settings/entities/user-settings.entity';
import { UserSettingsModule } from 'src/user-settings/user-settings.module';

@Module({
  imports: [UserSettingsModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
