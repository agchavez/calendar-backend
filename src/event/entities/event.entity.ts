import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/entities/user.entity';
@Schema()
export class Event extends Document {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  notes: string;

  @Prop({
    default: new Date(),
  })
  dateCreated: Date;

  @Prop({
    required: true,
  })
  start: Date;

  @Prop({
    required: true,
  })
  end: Date;

  @Prop({
    default: true,
  })
  status: boolean;

  @Prop({
    ref: User.name,
    required: true,
  })
  user: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
