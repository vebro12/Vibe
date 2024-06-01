import Trend from "../Models/trendsModel.js";

export const createTrend = async (req, res) => {
 
    const newTrend = new Trend({
      trendName:req.body.trendName,
      userId: req.body.userId,
    });
  try {
    const trend = await newTrend.save();
    res.status(200).json(trend);
  }
   catch (err) {

    res.status(500).json(err);
  }
};


export const getTrends = async (req, res) => {
  try {
    const trends = await Trend.find().sort({ createdAt: -1 });
    res.status(200).json(trends);
  } catch (err) {
    res.status(500).json(err);
  }
};
