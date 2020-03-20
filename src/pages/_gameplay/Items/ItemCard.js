import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ComponentCard from '../../../components/ComponentCard';

const ItemCard = ({ item }) => {
  console.log(item);

  return (
    item && (
      <ComponentCard component={item} title='name'>
        {item.examined && (
          <CardContent>
            <Typography variant='body2' component='p'>
              Wyniki badania:
            </Typography>

            <Typography variant='body2' color='textSecondary' component='p'>
              {item.examineInfo}
            </Typography>
          </CardContent>
        )}
      </ComponentCard>
    )
  );
};

export default ItemCard;
