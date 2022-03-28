import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDtos, UpdateEventDtos } from '../dtos/event.dtos';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(event: EventDtos): Promise<Event> {
    const createdEvent = new this.eventModel(event);
    return await createdEvent.save();
  }

  async getEvent(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new BadRequestException(`Event with id ${id} not found`);
    }
    return event;
  }

  async getEvents(limit: number, offset: number): Promise<any> {
    return await Promise.all([
      this.eventModel
        .find({
          status: true,
        })
        .limit(limit)
        .skip(offset)
        .exec(),
      this.eventModel
        .countDocuments({
          status: true,
        })
        .exec(),
    ]);
  }

  async updateEvent(id: string, event: UpdateEventDtos): Promise<Event> {
    const eventUpdate = await this.eventModel.findByIdAndUpdate(id, {
      $set: {
        ...event,
      },
    });

    if (!eventUpdate) {
      throw new BadRequestException(`Event with id ${id} not found`);
    }
    return eventUpdate;
  }

  //Eliminar un evento por su id
  async deleteEvent(id: string): Promise<any> {
    const eventDelete = await this.eventModel.findByIdAndUpdate(id, {
      $set: {
        status: false,
      },
    });
    if (!eventDelete) {
      throw new BadRequestException(`Event with id ${id} not found`);
    }
    return {
      message: 'Event deleted',
      ok: true,
    };
  }
}
