import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrgChart from '@dabeng/react-orgchart';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Node from './Node';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    height: '100%',
    overflow: 'hidden',
  },
}));

const TreeDiagram = ({ data }) => {
  const classes = useStyles();

  const [tree, setTree] = React.useState();
  const [warning, setWarning] = React.useState(null);

  const createTree = root => iterate(root, 'actions');

  const iterate = (component, type) => {
    let children;

    children = component.successors?.map(({ type, id }) =>
      iterate(getComponentByTypeAndId(type, id), type)
    );

    const node = {
      id: `${component.id}${type}`,
      name: component.name || component.fullname,
      title: translateType(type),
      children,
    };

    return node;
  };

  const getComponentByTypeAndId = (type, id) =>
    data[type].find(component => component.id === id);

  const translateType = type => {
    switch (type) {
      case 'actions':
        return 'Akcja';
      case 'items':
        return 'Przedmiot';
      case 'locations':
        return 'Miejsce';
      case 'people':
        return 'Osoba';
      default:
        return;
    }
  };

  React.useEffect(() => {
    if (data) {
      const rootId = data.frst_action_id;
      if (rootId) {
        const rootAction = data.actions.find(action => action.id === rootId);
        const tree = createTree(rootAction);
        setTree(tree);
      } else {
        setWarning(
          'Nie można utworzyć drzewa komponentów. Prawdopodobnie nie jest ustawiona akcja startowa. '
        );
      }
    }
  }, [data]);

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Diagram komponentów
      </Typography>
      {tree ? (
        <OrgChart
          datasource={tree}
          pan={true}
          zoom={true}
          chartClass='myChart'
          NodeTemplate={Node}
        />
      ) : warning ? (
        warning
      ) : (
        <LinearProgress />
      )}
    </Paper>
  );
};

export default TreeDiagram;
