import { ReactNode, useCallback } from 'react';

import { IconButton as MUIIconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ViewListIcon from '@material-ui/icons/ViewList';
import VisibilityIcon from '@material-ui/icons/Visibility';

type Props = { 
  onClick: (value?: any) => void; 
  color?: 'default' | 'primary'| 'secondary'; 
  className?: string; 
  type?: string ;
  size? : 'small' | 'medium';
};

const IconButton = ({ 
  onClick, 
  color = 'default', 
  className, 
  type, 
  size = 'medium',
}: Props) => {

  const getIcon: () => ReactNode = useCallback(() => {
    let Icon;
    switch (type) {
      case 'add':
        Icon = <AddIcon />; break;
      case 'list':
        Icon = <ViewListIcon />; break;
      case 'close':
        Icon = <CloseIcon />; break;
      case 'delete':
        Icon = <DeleteIcon />; break;
      case 'preview':
        Icon = <VisibilityIcon />; break;
      case 'edit':
        Icon = <EditIcon />; break;
      case 'open-new':
        Icon = <OpenInNewIcon />; break;
      default:
        Icon = <AddIcon />;
      }

    return Icon;
  }, [type]);
  
  return (
    <MUIIconButton
      aria-label={type}
      onClick={onClick}
      color={color}
      className={className}
      size={size}
    >
      {getIcon()}
    </MUIIconButton>
  );
};


export default IconButton;