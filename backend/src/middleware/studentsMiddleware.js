const {
  STUDENT_0001,
  STUDENT_0002,
  STUDENT_0003,
  STUDENT_0004,
  STUDENT_0005,
  STUDENT_0006
} = require("../helper/errors");


const validateBody = (req, res, next) => {
  console.log('llegando:',req.body);

  if (!req.body.firstname) {
    res.status(400).send(STUDENT_0003);
    return;
  }

  if (req.body.firstname.length > 100) {
    res.status(400).send(STUDENT_0001);
    return;
  }

  if (!req.body.lastname) {
    res.status(400).send(STUDENT_0003);
    return;
  }

  if (req.body.lastname.length > 100) {
    res.status(400).send(STUDENT_0001);
    return;
  }

  if (!req.body.dni) {
    res.status(400).json(STUDENT_0003);
    return;
  }

  if(isNaN(Number(req.body.dni))){
    res.status(400).json(STUDENT_0003);
    return;
  }
  if(!req.body.email){
    res.status(400).send(STUDENT_0003);
    return;
  }

  if(!req.body.email.length > 100){
    res.status(400).send(STUDENT_0001);
    return;
  }
  next();
};


const validateById = (req, res, next) => {
  if (isNaN(Number(req.params.id))) {
    res.status(400).json(STUDENT_0002);
    return;
  }

  req.params.id = Number(req.params.id);

  next();
};

const validateByLastname = (req,res,next) => {
  if(!req.params.lastname){
  res.status(400).json(STUDENT_0006)
  }
  next();
}

module.exports = {
  validateBody,
  validateById,
  validateByLastname,
};
