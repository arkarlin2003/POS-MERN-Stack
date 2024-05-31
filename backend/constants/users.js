import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ar Kar Lin",
    email: "arkar@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
