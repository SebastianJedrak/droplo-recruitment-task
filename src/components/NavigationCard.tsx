import React from 'react';
import NavigationItem from './NavigationItem';

const NavigationCard: React.FC = () => {
  return (
    <div>
      <ul>
        <NavigationItem />
        <NavigationItem />
        <NavigationItem />
      </ul>
    </div>
  );
};

export default NavigationCard;