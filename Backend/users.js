const dbConnection = require('./dbConnection');
const bcrypt = require('bcrypt');

// User signup
const signup = (user, callback) => {
  
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      callback(err, null);
      return;
    }
    const userWithHashedPassword = { ...user, password: hash };
    dbConnection.query('INSERT INTO users SET ?', userWithHashedPassword, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, { userId: results.insertId, ...userWithHashedPassword });
    });
  });
};

// User sign-in
const signIn = (email, password, callback) => {
  dbConnection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (results.length === 0) {
      callback(null, null);
      return;
    }
    //check user password is mactch
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        callback(err, null);
        return;
      }

      if (isMatch) {
        callback(null, user);
      } else {
        callback(null, null);
      }
    });
  });
};

module.exports = {
  signup,
  signIn
};
