import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

type Props = { onClose: any; color: 'default' | 'primary'| 'secondary'; className: string };
const CloseIconButton = ({ onClose, color = 'default', className }: Props) => {

  return (
    <IconButton
      aria-label="close"
      onClick={onClose}
      color={color}
      className={className}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseIconButton;
