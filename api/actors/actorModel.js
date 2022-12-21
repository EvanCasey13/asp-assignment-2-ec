import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  adult: { type: Boolean },
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  known_for_department: { type: String },
  profile_path: { type: String }
});

ActorSchema.statics.findByActorDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Actors', ActorSchema);