import * as mongoose from 'mongoose';

export const ActorSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  name: { type: String },
});

const ActorModel = mongoose.model('Actor', ActorSchema);
export default ActorModel;
