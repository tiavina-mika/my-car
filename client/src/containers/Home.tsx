import { Box } from '@material-ui/core';

import Cars from './cars/Cars';

const Home = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Cars />
    </Box>
  );
}

export default Home;