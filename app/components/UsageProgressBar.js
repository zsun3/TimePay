// components/UsageProgressBar.js
import React from 'react';

const UsageProgressBar = ({ usage, budget, title }) => {
  const totalBudget = budget;
  const percentage = (usage / totalBudget) * 100;

  const progressBarStyles = {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '13px',
    padding: '3px',
    marginBottom: '10px',
  };

  const progressStyles = {
    width: `${percentage}%`,
    backgroundColor: percentage > 80 ? '#d32f2f' : '#66bb6a', // Red if over 80%, green otherwise
    borderRadius: '8px',
    height: '20px',
    transition: 'width 0.5s ease-in-out',
  };

  const labelStyles = {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <div>
      <div style={progressBarStyles}>
        <div style={progressStyles}></div>
      </div>
      <div style={labelStyles}>{title}: ${usage.toLocaleString()} / ${totalBudget.toLocaleString()}</div>
    </div>
  );
};

export default UsageProgressBar;