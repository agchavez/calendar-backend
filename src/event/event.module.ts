import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventController } from './services/event.controller';

@Module({
  controllers: [EventController]
})
export class EventModule {}
