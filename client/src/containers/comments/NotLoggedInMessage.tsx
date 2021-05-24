
import { Box } from '@material-ui/core';

import Link from '../../components/Link';

const NotConnectedMessage = () => {
  return (
    <Box pl={1}>
      <Link
        content="Connectez-vous"
        textAfter="pour pouvoir commenter cet article"
        href="/login"
      />
    </Box>
  );
}

export default NotConnectedMessage;