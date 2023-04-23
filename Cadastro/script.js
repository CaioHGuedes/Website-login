let usuarios = []

if (localStorage.getItem('cadastrados')) {
  usuarios = JSON.parse(localStorage.getItem('cadastrados'))
}

function cadastrar() {
  let nome_storage = document.getElementById('nome').value
  let senha_storage = document.getElementById('senha').value
  let cpf_storage = document.getElementById('cpf').value
  let email_storage = document.getElementById('email').value
  let data_nasc = document.getElementById('data-nascimento').value
  let data = new Date()
  let usuario = {
    nome: nome_storage.toLowerCase().trim(),
    senha: senha_storage,
    cpf: cpf_storage.trim(),
    dataDeNascimento: data_nasc,
    email: email_storage,
    dataCriada: `${data.getUTCDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`
  }

  if (
    nome_storage.length > 2 &&
    senha_storage.length > 5 &&
    senha_storage.length < 11 &&
    cpf_storage.length == 11 &&
    email_storage.trim().length != 0 &&
    data_nasc.trim().length != 0 &&
    nome_storage.trim().length != 0 &&
    senha_storage.trim().length != 0 &&
    cpf_storage.trim().length != 0
  ) {
    if (search_usuario(usuario.cpf) == -1) {
      usuarios.push(usuario)
      localStorage.setItem('cadastrados', JSON.stringify(usuarios))
      alert('Usuário cadastrado com sucesso!')
      location.assign('login.html')
    } else {
      alert('Usuário já existente!')
    }
  }
  if (nome_storage.length <= 2 || nome_storage.trim().length == 0) {
    document.getElementById('error-nome').innerHTML = `Mínimo de 3 caracteres`
    setTimeout(() => {
      document.getElementById('error-nome').innerHTML = ``
    }, 3000)
  }
  if (
    senha_storage.length < 6 ||
    senha_storage.length > 10 ||
    senha_storage.trim().length == 0
  ) {
    document.getElementById(
      'error-senha'
    ).innerHTML = `A senha deve ter entre 6-10 caracteres`
    setTimeout(() => {
      document.getElementById('error-senha').innerHTML = ``
    }, 3000)
  }
  if (cpf_storage.length != 11) {
    document.getElementById(
      'error-cpf'
    ).innerHTML = `CPF tem que ter, exatamente, 11 dígitos`
    setTimeout(() => {
      document.getElementById('error-cpf').innerHTML = ``
    }, 3000)
  }
  if (email_storage.length == 0) {
    document.getElementById('error-email').innerHTML = `E-mail necessário`
    setTimeout(() => {
      document.getElementById('error-email').innerHTML = ``
    }, 3000)
  }
  if (data_nasc.length == 0) {
    document.getElementById('error-data').innerHTML =
      'Data de nascimento necessária'
    setTimeout(() => {
      document.getElementById('error-data').innerHTML = ``
    }, 3000)
  }
}

function search_usuario(cpf_storage) {
  let index = usuarios.findIndex(element => {
    return element.cpf == cpf_storage
  })
  return index
}
