import User from '../models/user';

const signup = async (req, res) => {
  let { email, password } = req.body;

  try {
    // Check if the email has been already registered.
    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({
        error: true,
        message: 'Email is already used',
      });
    }

    const newUser = new User({ email, password });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: 'Registration Success',
    });
  } catch (error) {
    console.error('signup-error', error);

    return res.status(500).json({
      error: true,
      message: 'Cannot Register',
    });
  }
};


// ---------------------------------- //
// ------------- EXPORT ------------- //
// ---------------------------------- //
export default {
  signup,
};