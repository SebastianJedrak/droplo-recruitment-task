import React from 'react';

interface NavigationItemProps {
    key: string;
    title: string;
    link: string;
  }

const NavigationItem: React.FC<NavigationItemProps> = ({key, title, link}) => {
  return (
    <li>
      NavigationItem - {key} {title} {link}
    </li>
  );
};

export default NavigationItem;