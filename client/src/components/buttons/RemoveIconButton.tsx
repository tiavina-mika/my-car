import React from 'react';

import { IconButton } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';

type Props = { onRemove: any; color: 'default' | 'primary'| 'secondary'; className: string };

const RemoveIconButton = ({ onRemove, color = 'primary', className }: Props) => {

  return (
    <IconButton
      aria-label='add'
      onClick={onRemove}
      color={color}
      className={className}
    >
      <RemoveIcon />
    </IconButton>
  );
};

export default RemoveIconButton;