import React from 'react';
import ComponentCard from '../../../components/ComponentCard';

const LocationCard = ({ location }) => {
  return location && <ComponentCard component={location} title='name' />;
};

export default LocationCard;
