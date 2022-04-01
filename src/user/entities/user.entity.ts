import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({
    required: true,
    MIN_VALUE: 5,
    uppercase: true,
  })
  firstName: string;
  @Prop({
    required: true,
    MIN_VALUE: 5,
    uppercase: true,
  })
  lastName: string;
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  @Exclude()
  password: string;

  @Prop({
    default: false,
  })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});
