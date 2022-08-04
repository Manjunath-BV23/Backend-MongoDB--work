const mongoose = require("mongoose")

// step 1 :- connect to mongodb
const connect = () => {
    return mongoose.connect(
      "mongodb+srv://manju:bvm_123@cluster0.24asz.mongodb.net/express_mvc?"
    );
};

module.exports = connect