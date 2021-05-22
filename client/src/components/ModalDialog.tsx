import { ReactNode } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import LoadingButton from './LoadingButton';

const useStyles = makeStyles({
  dialogContainer: {
    minWidth: 600,
  },
  dialogTitle: {
    '& > h2': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  dialogContent: {
    composes: 'flexColumn stretch',
  },
  dialogAction: {
    // margin: '13px 30px',
    padding: '0 18px 16px 18px',
  },
  button: {
    minHeight: 32,
  },
});

type Props = { 
	title: string;
	content: any;
	bsClass?: string;
	iconTitle?: ReactNode;
	isVisible?: boolean;
	onClose?: any;
	onConfirm?: any;
	labelConfirm?: string;
	labelCancel?: string;
	otherAction?: any;
	labelOtherAction?: string;
	className?: string;
	loading?: boolean;
	greenBtn?: boolean;
  titleClassName?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
};
const ModalDialog = ({
  title, content, bsClass, isVisible = false,
  onClose, labelCancel = 'Annuler',
  onConfirm, labelConfirm = 'Valider',
  otherAction, labelOtherAction = '', loading = false,
  className, greenBtn = false, iconTitle,
  titleClassName, maxWidth,
}: Props) => {

  // styles
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: className || classes.dialogContainer }}
      open={isVisible}
      onClose={onClose}
      maxWidth={maxWidth}
    >
      { !!title && (
        <DialogTitle classes={{ root: clsx(classes.dialogTitle, titleClassName) }}>
          {title}
          {iconTitle}
        </DialogTitle>
      ) }

      <DialogContent classes={{ root: bsClass || classes.dialogContent }}>
        {content}
      </DialogContent>

      { (!!labelCancel || !!labelConfirm || !!labelOtherAction) && (
        <DialogActions classes={{ root: classes.dialogAction }}>
          { onClose && labelCancel && !greenBtn && (
            <Button onClick={onClose}>
              {labelCancel}
            </Button>
          )}
          { otherAction && labelOtherAction && (
            <Button onClick={otherAction} classes={{ root: classes.button }}>
              {labelOtherAction}
            </Button>
          )}
          { onConfirm && labelConfirm && !loading && !greenBtn && (
            <Button onClick={onConfirm} color='primary' variant="contained">
              {labelConfirm}
            </Button>
          )}
          { onConfirm && labelConfirm && loading && (
            <LoadingButton
              onClick={onConfirm}
              color='primary'
              variant='contained'
              disabled={loading}
              loading={loading}
              className={classes.button}
            >
              {labelConfirm}
            </LoadingButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalDialog;