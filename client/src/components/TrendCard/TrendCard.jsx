import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrends } from '../../actions/TrendsAction.js'; // Adjust the path based on your structure
import './TrendCard.css';

const TrendCard = ({ userId }) => {
  const dispatch = useDispatch();
  const { trends } = useSelector((state) => state.trends);
  const [trendDetails, setTrendDetails] = useState([]);

  useEffect(() => {
    dispatch(getTrends(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const details = trends.reduce((acc, trend) => {
      if (!acc[trend.trendName]) {
        acc[trend.trendName] = { count: 1 };
      } else {
        acc[trend.trendName].count += 1;

      }
      return acc;
    }, {});
    setTrendDetails(details);
  }, [trends]);


  const sortedTrends = Object.entries(trendDetails).sort((a, b) => b[1].count - a[1].count);

  return (
    <div className="TrendCard">
      <h3># Trends for you</h3>
      {sortedTrends.map(([trendName, detail], id) => (
        <div className="trend" key={id}>
          <span>{trendName}</span>
          <span>{detail.count} shares</span>
        </div>
      ))}
    </div>
  );
};

export default TrendCard;
