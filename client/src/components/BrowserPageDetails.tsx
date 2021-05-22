import { Helmet } from 'react-helmet-async';

import { projectNameUpper } from '../utils/constants';

type Props = { title: string; };

const BrowserPageDetails = ({ title }: Props) => {
  return (
    <Helmet>
      <title>
        {projectNameUpper}
        -
        {title}
      </title>
    </Helmet>
  );
};

export default BrowserPageDetails;