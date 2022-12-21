import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShowSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  overview: { type: String },
  first_air_date: { type: String },
  vote_average: { type: String },
  poster_path: { type: String }
});

ShowSchema.statics.findByShowDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Shows', ShowSchema);