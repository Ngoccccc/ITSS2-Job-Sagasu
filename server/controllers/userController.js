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
      name: result.name,
      surname: result.surname,
      color: result.color,
      email : result.email
    };
    return res.status(200).send(dataTransferObject);
  })
}


module.exports = {
  register,
  // login,
  // getUser,
  getUserWithMail,
};
