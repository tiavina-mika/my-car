import React from 'react';

import { IconButton } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';

type Props = { onShowList: any; className: string };

const ListIconButton = ({ onShowList, className }: Props) => {

  return (
    <IconButton
      aria-label='view-list'
      onClick={onShowList}
      className={className}
    >
      <ViewListIcon />
    </IconButton>
  );
};

export default ListIconButton;