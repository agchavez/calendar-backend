import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { EventDtos, UpdateEventDtos } from '../dtos/event.dtos';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@UseGuards(AuthGuard('jwt'))
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get('/')
  getEvents(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Req() req: Request,
  ) {
    const user = req.user as any;

    return this.eventService.getEvents(limit, offset);
  }

  @Get('/:id')
  getEvent(@Param('id', MongoIdPipe) id: string) {
    return this.eventService.getEvent(id);
  }

  @Post('/')
  createUser(@Body() event: EventDtos, @Req() req: Request) {
    const user = req.user as any;

    return this.eventService.createEvent(event, user.sub);
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
