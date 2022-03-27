import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDtos } from '../dtos/event.dtos';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(event: EventDtos): Promise<Event> {
    const createdEvent = new this.eventModel(event);
    return await createdEvent.save();
  }

  async getEvents(limit: number, offset: number): Promise<any> {
    return await Promise.all([
      this.eventModel.find().limit(limit).skip(offset).exec(),
      this.eventModel.countDocuments().exec(),
    ]);
  }
}
