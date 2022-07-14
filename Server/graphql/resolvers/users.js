const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    "123",
    { expiresIn: "1h" }
  );
}
module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { cpf, password }) {
      const { errors, valid } = validateLoginInput(cpf, password);
      const user = await User.findOne({ cpf });

      if (!user) {
        errors.general = "CPF Invalido";
        throw new UserInputError("Login Invalido", { errors });
      }

      const pass = await bcrypt.compare(password, user.password);
      if (!pass) {
        errors.general = "Senha Invalida";
        throw new UserInputError("Senha Invalida", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, password, confirmPassword, cpf } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        cpf,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ cpf });
      if (user) {
        throw new UserInputError("Esse usuário já está cadastrado", {
          errors: {
            username: "Esse usuário já existe",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        password,
        cpf,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
