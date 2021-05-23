import User from '../models/user';

/**
 * 
 * signup the user
 * @param {*} req { body: { name, email, password, confirmPassword } }
 * @param {*} res 
 * @returns 
 */
const signup = async (req, res) => {

  try {
    // Check if the email has been already registered.
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({
        error: true,
        message: 'Email is already used',
      });
    }

    const newUser = new User(req.body);
    const adminEmail = process.env.ADMIN_EMAIL;

    if (adminEmail && adminEmail === req.body.email) {
      newUser.roles.push('ADMINISTRATOR');
    } else {
      newUser.roles.push('USER');
    }

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: 'Registration Success',
    });

  } catch (error) {
    console.error('signup error', error);

    return res.status(500).json({
      error: true,
      message: 'Cannot Register',
    });
  }
};


/**
 * 
 * login the user
 * @param {*} req { body: { email, password } }
 * @param {*} res 
 * @returns 
 */
const login = async (req, res) => {
  let { email, password } = req.body;

  try {

    // ------------------------------ //
    // --- find user by its email --- //
    // ------------------------------ //
    const user = await User.findOne({ email });

    // ------------------------------------ //
    // --- send error if user not found --- //
    // ------------------------------------ //
    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'Email does not exist',
      });
    }

    // --------------------------------------------------------- //
    // -- compare the input password width the saved password -- //
    // --------------------------------------------------------- //
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        error: true,
        message: 'Password does not match',
      }); 
    }

    // ------------------------------- //
    // ------- generate token -------- //
    // ------------------------------- //
    const token = await user.generateToken();

    if (!token) {
      return res.status(200).json({
        error: true,
        message: 'Authentication failed',
      });
    }

    // ------------------------------- //
    // ---- send successful result --- //
    // ------------------------------- //
    return res.status(200).json(user);

  } catch (error) {
    console.error('login error', error);

    return res.status(500).json({
      error: true,
      message: 'Cannot login',
    });
  }
};


/**
 * logout the current connected user
 * @param {*} req { user }
 * @param {*} res 
 * @returns 
 */
const logout = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, { token: '' });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('logout error: ', error);

    return res.status(500).json({
      error: true,
      message: 'Cannot logout',
    });
  }
}

/**
 * 
 * test if the user is connected
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    const user = await User.findByToken(token);
    if (!user) return res.json({ isAuth: false, error: true, message: 'No User connected' });
    if (user && user.token !== token) return res.json({ isAuth: false, error: true, message: 'Invalid Token' });

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error('isAuth error: ', error);
  }
}


/**
 * 
 * test if the user is connected
 * @param {*} req { params: { userId, token }, user, token }
 * @param {*} res 
 * @returns 
 */
 const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    const currentToken = req.token;

    const { userId, token } = req.params;

    if (userId !== user.id && token !== currentToken) {
      return res.status(500).json({
        error: true,
        message: 'Not authorized',
      });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('getCurrentUser error: ', error);

    return res.status(500).json({
      error: true,
      message: 'Cannot get current user',
    });
  }
}


// ---------------------------------- //
// ------------- EXPORT ------------- //
// ---------------------------------- //
export default {
  signup,
  login,
  logout,
  isAuth,
  getCurrentUser,
};