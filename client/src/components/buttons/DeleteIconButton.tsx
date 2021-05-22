import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

type Props = { onDelete: any; color: 'default' | 'primary'| 'secondary'; className: string };

const DeleteIconButton = ({ onDelete, color = 'default', className }: Props) => {

  return (
    <IconButton
      aria-label='delete'
      onClick={onDelete}
      color={color}
      className={className}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteIconButton;