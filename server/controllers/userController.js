const bcrypt = require("bcryptjs");
const userService = require("../services/userService");
const auth = require("../middlewares/auth");

const register = async (req, res) => {
  const { avata, name, email, phone, company, password, companyaddress, faceImage, idPhoto, companyPhoto, status } = req.body;
  if (!(avata && name && email))
    return res
      .status("400")
      .send({ errMessage: "Please fill all required areas!" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;

  await userService.register(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(201).send(result);
  });
};


const getUserWithMail = async(req,res) => {
  const {email} = req.body;
  await userService.getUserWithMail(email,(err,result)=>{
    if(err) return res.status(404).send(err);

    const dataTransferObject = {
      _id: result._id,
      avata: result.avata,
      name: result.name,
      email: result.email,
      phone: result.phone,
      company: result.company,
      companyAddress: result.companyAddress,
      faceImage: result.faceImage,
      idPhoto: result.idPhoto,
      companyPhoto: result.companyPhoto,
      status: result.status,
    };
    return res.status(200).send(dataTransferObject);
  })
}



const getActive = async(req,res) => {
  const {email} = req.body;
  await userService.getUserWithMail(email,(err,result)=>{
    if(err) return res.status(404).send(err);

    const dataTransferObject = {
      name: result.name,
      status: result.status,
      email : result.email
    };
    return res.status(200).send(dataTransferObject);
  })
}


const activeUser = async(req,res) => {
  const {email} = req.body;
  await userService.activeUser(email,(err,result)=>{
    if(err) return res.status(404).send(err);

    const dataTransferObject = {
      name: result.name,
      status: result.status,
      email : result.email
    };
    return res.status(200).send(dataTransferObject);
  })
}

const getInactiveUser = async(req,res) => {
  await userService.getInactiveUser((err,result)=>{
    if(err) return res.status(404).send(err);
    return res.status(200).send(result);
  })
}


module.exports = {
  register,
  // login,
  // getUser,
  activeUser,
  getInactiveUser,
  getUserWithMail,
  getActive
};
