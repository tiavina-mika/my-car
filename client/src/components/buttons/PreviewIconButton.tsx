import React from 'react';

import { IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

type Props = { onShowPreview: any; className: string };

const PreviewIconButton = ({ onShowPreview, className }: Props) => {

  return (
    <IconButton
      aria-label='preview'
      onClick={onShowPreview}
      className={className}
    >
      <ChevronRightIcon />
    </IconButton>
  );
};

export default PreviewIconButton;