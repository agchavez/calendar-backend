import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { EventDtos, GetEventDtos, UpdateEventDtos } from '../dtos/event.dtos';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { TokenGuard } from 'src/auth/guards/token.guard';

@UseGuards(TokenGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/')
  getEvents(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.eventService.getEvents(limit, offset);
  }

  @Get('/:id')
  getEvent(@Param('id', MongoIdPipe) id: string) {
    return this.eventService.getEvent(id);
  }

  @Post('/')
  createUser(@Body() event: EventDtos) {
    return this.eventService.createEvent(event);
  }

  @Put('/:id')
  updateEvents(
    @Param('id', MongoIdPipe) id: string,
    @Body() event: UpdateEventDtos,
  ) {
    return this.eventService.updateEvent(id, event);
  }

  @Delete('/:id')
  deleteEvent(@Param('id', MongoIdPipe) id: string) {
    return this.eventService.deleteEvent(id);
  }
}
