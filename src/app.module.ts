import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
  ],
})
export class AppModule {}
