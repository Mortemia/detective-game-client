import React from 'react';
import OrgChart from '@dabeng/react-orgchart';
import LinearProgress from '@material-ui/core/LinearProgress';
import Node from './Node';

const TreeDiagram = ({ data }) => {
  const [tree, setTree] = React.useState();

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
        break;
      case 'items':
        return 'Przedmiot';
        break;
      case 'locations':
        return 'Miejsce';
        break;
      case 'people':
        return 'Osoba';
        break;
      default:
        return;
    }
  };

  React.useEffect(() => {
    if (data) {
      const rootId = data.frst_action_id;
      const rootAction = data.actions.find(action => action.id === rootId);
      const tree = createTree(rootAction);
      setTree(tree);
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
  ) : (
    <LinearProgress />
  );
};

export default TreeDiagram;
