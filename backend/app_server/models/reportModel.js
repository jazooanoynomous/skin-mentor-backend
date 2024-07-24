var userModel = require('mongoose');
var varlidatorr = require('validator');



var schema = new userModel.Schema({
 
  doctorName: {
    type: String,
  },
  doctorImage: {
    type: String,
  },
  reportRequesterId: {
    type: String,
  },
  reportRequesterName: {
    type: String,
  },
  reportRequesterImage: {
    type: String,
  },
  reportRequesterNumber: {
    type: String,
  },
  disease : {
    type: String,
  },
  prescription : {
    type: String,
  }

 
});

module.exports = ModelUser = userModel.model("ModelReport", schema);