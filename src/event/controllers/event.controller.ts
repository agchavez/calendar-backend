import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { EventDtos, GetEventDtos } from '../dtos/event.dtos';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/')
  getEvents(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.eventService.getEvents(limit, offset);
  }

  @Post('/')
  createUser(@Body() event: EventDtos) {
    return this.eventService.createEvent(event);
  }
}
