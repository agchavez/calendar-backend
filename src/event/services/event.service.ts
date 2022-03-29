import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDtos, UpdateEventDtos } from '../dtos/event.dtos';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private userService: UserService,
  ) {}

  async createEvent(event: EventDtos, userId: any): Promise<Event> {
    const user = await this.userService.getUserById(userId);
    const createdEvent = new this.eventModel({
      ...event,
      user: user._id,
    });
    return await createdEvent.save();
  }

  async getEvent(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).populate({
      path: 'user',
      select: 'firstName lastName email',
    });
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
        .populate({
          path: 'user',
          select: 'firstName lastName email',
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

  async getEventsByUser(userId: string): Promise<Event[]> {
    const events = await this.eventModel.find({
      user: userId,
    });
    if (!events) {
      throw new BadRequestException(`Events with userId ${userId} not found`);
    }
    return events;
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
