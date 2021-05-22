import React from 'react';

import IconButton from './IconButton';

type Props = { onClick: () => void };
const DialogTitleIcon = ({ onClick }: Props) => {

  return (
    <IconButton 
      type="open-new" 
      onClick={onClick}
      size="small"
    />
  );
};

export default DialogTitleIcon;