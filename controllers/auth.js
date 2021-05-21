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

const login = async (req, res) => {
  let { email, password } = req.body;

  try {

    // Check if the email has been already registered.
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'Email does not exist',
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: 'Password does not match',
      }); 
    }

    const token = await user.generateToken();

    return res.status(200).json({
      success: true,
      user: { id: user._id, email: user.email, token },
    });
  } catch (error) {
    console.error('signup-error', error);

    return res.status(500).json({
      error: true,
      message: 'Cannot login',
    });
  }
};

const isAuth = async (req, res, next) => {
  // let token = req.cookies.authToken;
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    
    const user = await User.findByToken(token);
    if (!user) return res.json({ isAuth: false, error: true, message: 'No User connected' });
    if (user && user.token !== token) return res.json({ isAuth: false, error: true, message: 'Invalid Token' });

    req.token = token
    req.user = user;
    next();
  } catch (error) {
    console.error('error: ', error);
  }
}

// ---------------------------------- //
// ------------- EXPORT ------------- //
// ---------------------------------- //
export default {
  signup,
  login,
  isAuth,
};