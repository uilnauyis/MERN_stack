const mongoose = require('mongoose');

module.exports.connect = async () => {
  try {
    const connectionStr = process.env.CONNECTION_STRING;
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true
    });
    mongoose.connection
      .once('open', function() {
        console.log('Connected');
      })
      .on('error', function(error) {
        console.log('CONNECTION ERROR:', error);
      });

    console.log('mongodb connected ..');
  } catch (e) {
    console.log(`Database connection error: ${e}`);
  }
};
