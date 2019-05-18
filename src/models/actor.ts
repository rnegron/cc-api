import * as mongoose from 'mongoose';

import { IActorDocument } from '../interfaces';

export interface IActor extends IActorDocument {}

export interface IActorModel extends mongoose.Model<IActor> {}

export const ActorSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  name: { type: String },
});

const ActorModel = mongoose.model<IActor, IActorModel>('Actor', ActorSchema);

export default ActorModel;
