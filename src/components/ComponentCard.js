import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const ComponentCard = ({
  component,
  title,
  subheader,
  children,
  additionalInfo,
}) => {
  return (
    <Card>
      <CardHeader
        title={component[title] || title}
        subheader={component[subheader]}
      />
      {additionalInfo && <CardHeader subheader={additionalInfo} />}
      <CardContent>
        <Typography variant='body2' color='textPrimary' component='p'>
          {component.description}
        </Typography>
      </CardContent>
      {children}
    </Card>
  );
};

export default ComponentCard;
