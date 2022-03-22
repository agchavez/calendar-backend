import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { JobModule } from './job/job.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, EventModule, JobModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
