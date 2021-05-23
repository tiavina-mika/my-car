import Car from '../models/car';


/**
 * 
 * comment a car
 * @param {*} req { car, user, body: { text } }
 * @param {*} res 
 */
const create = async (req, res) => {
  try {
    const { text } = req.body;
    const car = req.car;
    const user = req.user;
 
    const newComment = { 
      text,
      postedBy: user.id,
    };

    const result = await Car.findByIdAndUpdate(car._id, { $push: { comments: newComment } }, { new: true })
        .populate('comments.postedBy')
        .exec();

    res.status(200).json(result);
  } catch(error) {
    res.status(400).json(error);
  }
}


/**
 * comment a car
 * @param {*} req { car, params: { commentId } }
 * @param {*} res 
 */
const remove = async (req, res) => {
  try {
    const car = req.car;
    const { commentId } = req.params;
 
    const result = await Car.findByIdAndUpdate(car._id, { $pull: { comments: { _id: commentId } } }, { new: true })
        .populate('comments.postedBy')
        .exec();

    res.status(200).json(result);
  } catch(error) {
    res.status(400).json(error);
  }
}


/**
 * 
 * comment a car
 * @param {*} req { car, params: { commentId }, body: { text } }
 * @param {*} res 
 */
 const edit = async (req, res) => {
  try {
    const { text } = req.body;
    const car = req.car;
    const { commentId } = req.params;

    const result = await Car.findOneAndUpdate({
        _id: car._id,
        "comments._id": commentId,
      }, {
          $set: {
              "comments.$.text": text,
              "comments.$.updatedAt": Date.now(),
          }
      },
      { new: true })
      .populate('comments.postedBy')
      .exec();

    res.status(200).json(result);
  } catch(error) {
    console.log('comment edit error: ', error);
    res.status(400).json(error);
  }
}


// ---------------------------------- //
// ------------- EXPORT ------------- //
// ---------------------------------- //
export default {
  create,
  edit,
  remove,
};