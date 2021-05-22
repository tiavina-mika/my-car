import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

type Props = { onAdd: any; color?: 'default' | 'primary'| 'secondary'; className?: string };

const AddIconButton = ({ onAdd, color = 'primary', className }: Props) => {

  return (
    <IconButton
      aria-label='add'
      onClick={onAdd}
      color={color}
      className={className}
    >
      <AddIcon />
    </IconButton>
  );
};


export default AddIconButton;