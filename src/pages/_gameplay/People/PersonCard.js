import React from 'react';
import ComponentCard from '../../../components/ComponentCard';

const PersonCard = ({ person }) => {
  return person && <ComponentCard component={person} title='fullname' />;
};

export default PersonCard;
