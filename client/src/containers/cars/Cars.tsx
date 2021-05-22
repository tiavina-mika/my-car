import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Car as CarType } from '../../types/car';
import { Comment } from '../../types/comment';
import Car from './Car';

const useStyles = makeStyles((theme: Theme) => ({
  cars: {
    margin: -theme.spacing(10),
  },
  car: {
    margin: theme.spacing(10),
  }
}));

const comments: Comment[] = [
  {
    id: '1',
    text: 'Some comment 1',
    updatedAt: '2h',
    createdAt: '21-05-21',
    postedBy: {
      id: '1',
      name: 'Tiavina Michael Ralainirina',
      email: 'tiavina@gmail.com',
      active: false,
      createdAt: '21-05-21',
      updatedAt: '21-05-21',
    }
  },
  {
    id: '2',
    text: 'Some comment 2 there',
    updatedAt: '10h',
    createdAt: '21-05-21',
    postedBy: {
      id: '2',
      name: 'Tatiana Maria Ramanantsalama',
      email: 'tiavina@gmail.com',
      active: false,
      createdAt: '21-05-21',
      updatedAt: '21-05-21',
    }
  },
  {
    id: '3',
    text: 'Some comment 3 there',
    updatedAt: '8h',
    createdAt: '21-05-21',
    postedBy: {
      id: '3',
      name: 'Tanteraka Mario Ralainirina',
      email: 'tiavina@gmail.com',
      active: false,
      createdAt: '21-05-21',
      updatedAt: '21-05-21',
    }
  },
];

const cars: CarType[] = [
  {
    'name': 'Renault Twingo',
    'shortDesc': 'Intens - 1.0 SCe 70',
    'year': '2014',
    'distance': '75817 Km',
    'fuel': 'Essence',
    'gearbox': 'Manuelle',
    'price': '6 490 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/tvq9xfy54j1d3cyaqwgr.jpg',
    'comments': comments,
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '1',
  },
  {
    'name': 'Dacia Sandero',
    'shortDesc': 'Intens - 1.0 SCe 70',
    'year': '2019',
    'distance': '15674 Km',
    'fuel': 'Essence',
    'gearbox': 'Manuelle',
    'price': '8 280 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/rwsvk7msfozsbbmzvwxv.jpg',
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '2',
  },
  {
    'name': 'Opel Astra GTC',
    'shortDesc': 'Sport - 1.4 Turbo 140',
    'year': '2012',
    'distance': '133209 Km',
    'fuel': 'Essence',
    'gearbox': 'Manuelle',
    'price': '5 790 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/dg1rkzdrcuwq0wm8ezbz.jpg',
    'comments': comments,
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '3',
  },
  {
    'name': 'Nissan Leaf',
    'shortDesc': 'Business - 40kWh 150',
    'year': '2020',
    'distance': '133209 Km',
    'fuel': 'Electrique',
    'gearbox': 'Automatique',
    'price': '22 890 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/sxcesmoc0pkjd6jaddoq.jpg',
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '4',
  },
  {
    'name': 'Land Rover Evoquef',
    'shortDesc': 'Dynamic Mark I - 2.0 Si4 240 BVA9',
    'year': '2013',
    'distance': '83312 Km',
    'fuel': 'Essence',
    'gearbox': 'Automatique',
    'price': '24 490 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/di5ao8wjyj4pb6vnr2r4.jpg',
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '5',
  },
  {
    'name': 'Renault Clio Estate',
    'shortDesc': 'Night&Day - 1.2 TCe 100',
    'year': '2011',
    'distance': '121624 Km',
    'fuel': 'Essence',
    'gearbox': 'Manuelle',
    'price': '3 390 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/p0qgzzckqiqlh9fzuy21.jpg',
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '6',
  },
  {
    'name': 'Peugeot Expert',
    'shortDesc': 'Standard Premium Pack - 1.6 BlueHDi 115',
    'year': '2018',
    'distance': '110976 Km',
    'fuel': 'Diesel',
    'gearbox': 'Manuelle',
    'price': '14 894 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/fovqlqocbtxtfv2agt8e.jpg',
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '7',
  },
  {
    'name': 'Renault Twingo',
    'shortDesc': 'Intens - 0.9 TCe 90 Energy',
    'year': '2018',
    'distance': '3085 Km',
    'fuel': 'Essence',
    'gearbox': 'Manuelle',
    'price': '10 090 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/lqvc8slhnse2z1ntufnx.jpg',
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '8',
  },
  {
    'name': 'Opel Astra',
    'shortDesc': 'Intens - 0.9 TCe 90 Energy',
    'year': '2016',
    'distance': '104327 Km',
    'fuel': 'Essence',
    'gearbox': 'Manuelle',
    'price': '11 070 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/s44f9wphwvxuz4jeyhzw.jpg',
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '9',
  },
  {
    'name': 'Volkswagen Golf SW',
    'shortDesc': 'Confortline Business - 1.6 TDI 110 BlueMotion',
    'year': '2016',
    'distance': '44137 Km',
    'fuel': 'Essence',
    'gearbox': 'Automatique',
    'price': '14 160 €',
    'image': 'https://res.cloudinary.com/lghaauto/w_768,q_auto,f_auto,fl_progressive:semi/kyump/pictures/q1y0dxbh7cymn7uuqnkt.jpg',
    'updatedAt': '2021-05-22',
    'createdAt': '2021-05-22',
    'id': '10',
  }
];

const Cars = () => {
  const classes = useStyles();

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