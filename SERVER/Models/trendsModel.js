import mongoose  from 'mongoose';

const TrendsSchema = new mongoose.Schema({
  trendName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const TrendsModel = mongoose.model('Trend', TrendsSchema);

export default TrendsModel;

