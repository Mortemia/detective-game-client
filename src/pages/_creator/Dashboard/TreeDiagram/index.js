import React from 'react';
import OrgChart from '@dabeng/react-orgchart';
import LinearProgress from '@material-ui/core/LinearProgress';
import Node from './Node';

const TreeDiagram = ({ data }) => {
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

  return tree ? (
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
  );
};

export default TreeDiagram;
