import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ComponentCard from '../../../components/ComponentCard';

const ItemCard = ({ item }) => {
  return (
    item && (
      <ComponentCard component={item} title='name'>
        {item.examined && (
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              Badanie kosztowało {item.exam_cost} PR.
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Wyniki badania:
            </Typography>

            <Typography
              variant='body2'
              component='p'
              style={{
                marginTop: '1rem',
              }}
            >
              {item.examineInfo}
            </Typography>
          </CardContent>
        )}
      </ComponentCard>
    )
  );
};

export default ItemCard;
