import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const ComponentCard = ({ component, title, subheader, children }) => {
  return (
    <Card>
      <CardHeader title={component[title]} subheader={component[subheader]} />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {component.description}
        </Typography>
      </CardContent>
      {children}
    </Card>
  );
};

export default ComponentCard;
