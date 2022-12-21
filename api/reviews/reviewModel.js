import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: { type: String, required: true },
    review: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
    movie_id: {type: Number, required: true},
    rating: {type: Number, required: true},
    id: { type: Number, required: true, unique: true },
});

export default mongoose.model('Reviews', ReviewSchema);


