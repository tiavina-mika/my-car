import { ReactNode, SyntheticEvent } from 'react';

import { Link as MUILink, Typography } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { getUrl } from '../actions/utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'underline',
    },
    leftText: {
      marginLeft: theme.spacing(0.5),
    },
    rightText: {
      marginRight: theme.spacing(0.5),
    },
  }),
);

type Props = { 
  textBefore?: string; 
  textAfter?: string; 
  label?: string | ReactNode;
  href?: string; // 'eg /login'
  className?: string;
  linkClassName?: string;
  isPreventDefault?: boolean;
}
const Link = ({
  textBefore,
  textAfter,
  label,
  href,
  className,
  linkClassName,
  isPreventDefault,
}: Props) => {
  const classes = useStyles();

  const preventDefault = (event: SyntheticEvent) => event.preventDefault();

  return (
    <Typography className={className}>
      {textBefore}
      <MUILink 
        href={getUrl() + href} 
        onClick={isPreventDefault ? preventDefault: undefined} 
        className={clsx(
          textBefore ? classes.leftText: undefined,
          textAfter ? classes.rightText: undefined,
          classes.link,
          linkClassName,
        )}
      >
        {label}
      </MUILink>
      {textAfter}
    </Typography>
  );
}

export default Link;