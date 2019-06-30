const connectionConfig = require('./configs/default.json');
const mongoose = require('mongoose');

module.exports.connect = async () => {
  try {
    const connectionStr = connectionConfig.connectionString.replace(
      '<password>',
      process.env.DB_PASSWORD
    );
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
    process.exit(1);
  }
};
