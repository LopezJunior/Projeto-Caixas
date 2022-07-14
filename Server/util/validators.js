module.exports.validateRegisterInput = (
  username,
  cpf,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Informe o nome do usuário";
  }
  if (password.trim() === "") {
    errors.password = "Informe a senha";
  } else if (password != confirmPassword) {
    errors.confirmPassword = "A senha não confere";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  return { errors, valid: true };
};

module.exports.validaProduto = (nome, valor) => {
  const errors = {};
  if (nome.trim() === "") {
    errors.nome = "Informe o nome do produto";
  }

  if (valor < 0) {
    errors.valor = "Informe um valor para o produto";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validaFesta = (nome, data) => {
  const errors = {};
  if (nome.trim() === "") {
    errors.nome = "Informe o nome da festa";
  }

  if (data.trim() === "") {
    errors.valor = "Informe uma data";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

