import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { EventSchema, Event } from './entities/event.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
