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
  content?: string | ReactNode;
  href?: string; // 'eg /login'
  rootClassName?: string;
  className?: string;
  isPreventDefault?: boolean;
  children?: ReactNode;
}
const Link = ({
  textBefore,
  textAfter,
  content,
  href,
  rootClassName,
  className,
  isPreventDefault,
  children,
}: Props) => {
  const classes = useStyles();

  const preventDefault = (event: SyntheticEvent) => event.preventDefault();

  const link = (
    <MUILink 
      href={getUrl() + href} 
      onClick={isPreventDefault ? preventDefault: undefined} 
      className={clsx(
        textBefore ? classes.leftText: undefined,
        textAfter ? classes.rightText: undefined,
        classes.link,
        className,
      )}
    >
      {children || content}
    </MUILink>
  );

  // for content other than a text, eg: img, div
  if (children) return link;

  return (
    <Typography className={rootClassName}>
      {textBefore}
      {link}
      {textAfter}
    </Typography>
  );
}

export default Link;