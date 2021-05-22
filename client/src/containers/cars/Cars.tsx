import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useLoadCars } from '../../hooks/userLoadCars';
import { Car as CarType } from '../../types/car';
import Car from './Car';

const useStyles = makeStyles((theme: Theme) => ({
  cars: {
    margin: -theme.spacing(10),
  },
  car: {
    margin: theme.spacing(10),
  }
}));

const Cars = () => {
  const classes = useStyles();

  // load car list
  const cars = useLoadCars();

  return (
    <Box>
      <Box className={classes.cars}>
        {cars.map((car: CarType, index: number) => (
          <Car car={car} key={index} className={classes.car} />
        ))}
      </Box>
    </Box>
  );
}

export default Cars;