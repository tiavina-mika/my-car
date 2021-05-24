import Car from '../models/car';
import { find, isAdmin, sendErrorResponse } from '../utils/utils';


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
    const user = req.user;
    const { commentId } = req.params;

    // get the current comment
    const comment = find(car.comments, commentId);

    // the admin and the user who create the comment are allow to edit the comment
    if (comment.postedBy._id !== user.id && !isAdmin(user)) {
      sendErrorResponse(res, 'Not allowed to delete this comment');
    }
 
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
    const user = req.user;
    const { commentId } = req.params;

    // get the current comment
    const comment = find(car.comments, commentId);

    // the admin and the user who create the comment are allow to edit the comment
    if (comment.postedBy._id !== user.id && !isAdmin(user)) {
      sendErrorResponse(res, 'Not allowed to edit this comment');
    }

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