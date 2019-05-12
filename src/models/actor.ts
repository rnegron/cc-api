import * as mongoose from 'mongoose';

export const ActorSchema = new mongoose.Schema({
  name: { type: String },
});

const ActorModel = mongoose.model('Actor', ActorSchema);
export default ActorModel;
