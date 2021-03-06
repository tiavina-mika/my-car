import Car from '../models/car';

/**
 * 
 * find a car by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} res 
 * @param {string} id 
 * @returns {*}
 */
const carById = async (req, res, next, id) => {
  try {
      const car = await Car.findById(id)
        .populate('comments.postedBy')
        .exec();

      if (!car) {
        return res.status(400).json({
          error: true,
          message: 'Id not found',
        });
      }
      
      req.car = car;
      next();
  } catch (error) {
      return res.status(400).json(error);
  }
}


// ----------------------------------- //
// -------------- WRITE -------------- //
// ----------------------------------- //

/**
 * 
 * creete a car
 * @param {*} req { car, body: { name, shortDesc, year, distance, fuel, gearbox, price, image*, comments* } }
 * @param {*} res 
 * @returns {*}
 */
 const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body || !req.body.name) {
      res.status(400).json({ message: 'Content can not be empty!' });
      return;
    }
  
    // Create a car
    const car = new Car(req.body);
  
    const result = await car.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


/**
 * 
 * update a car
 * @param {*} req { car, body: { name, shortDesc, year, distance, fuel, gearbox, price, image*, comments* } }
 * @param {*} res 
 * @returns {*}
 */
const edit = async (req, res) => {
  try {

      const car = await req.car;
      car.set(req.body);
      car.updatedAt = Date.now();
          
      const result = await car.save();
      res.status(200).json(result);
  } catch (error) {
      res.status(400).json(error);
  }
}


/**
 * 
 * delete a car
 * @param {*} req { car }
 * @param {*} res 
 * @returns {*}
 */
const remove = async (req, res) => {
  try {
      const car = await req.car;
      const removedCar = await car.remove();
      res.status(200).json(removedCar);
  } catch (error) {
      res.status(400).json(error);
  }
}


// ---------------------------------- //
// -------------- READ -------------- //
// ---------------------------------- //

/**
 * 
 * find all cars
 * @param {*} req 
 * @param {*} res 
 * @returns {*}
 */
const findAll = async (req, res) => {
  try {
    const cars = await Car.find()
      .populate('comments.postedBy')
      .exec();

    return res.status(200).json(cars);
  } catch (error) {
    res.status(400).json(error);
  }
}

/**
 * 
 * find one car
 * @param {*} req { car } 
 * @param {*} res 
 * @returns {*}
 */
const findOne = async (req, res) => {
  try {
      const car = await req.car;
      res.status(200).json(car);
  } catch (error) {
      res.status(400).json(error);
  }
}


// ---------------------------------- //
// ------------- EXPORT ------------- //
// ---------------------------------- //
export default {
  carById,
  create,
  edit,
  remove,
  findAll,
  findOne,
};