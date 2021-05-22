import React from 'react';

import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

type Props = { onEdit: any; className: string };

const EditIconButton = ({ onEdit, className }: Props) => {

  return (
    <IconButton
      aria-label='view-edition'
      onClick={onEdit}
      className={className}
    >
      <EditIcon />
    </IconButton>
  );
};

export default EditIconButton;