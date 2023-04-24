const form = document.getElementById('form-cadastro')
const nome_storage = document.getElementById('nome')
const senha_storage = document.getElementById('senha')
const cpf_storage = document.getElementById('cpf')
const email_storage = document.getElementById('email')
const data_nasc = document.getElementById('data-nascimento')

let usuarios = []

if (localStorage.getItem('cadastrados')) {
  usuarios = JSON.parse(localStorage.getItem('cadastrados'))
}

function cadastrar(event) {
  event.preventDefault()

  if (validateFields()) {
    return;
  }

  const nome = nome_storage.value
  const senha = senha_storage.value
  const cpf = cpf_storage.value
  const email = email_storage.value
  const dataNasc = data_nasc.value
  const data = new Date()

  if (
    nome.length > 2 &&
    senha.length > 5 &&
    senha.length < 11 &&
    cpf.length == 11 &&
    email.trim().length != 0 &&
    dataNasc.trim().length != 0 &&
    nome.trim().length != 0 &&
    senha.trim().length != 0 &&
    cpf.trim().length != 0
  ) {
    if (search_usuario(cpf.trim()) == -1) {
      const usuario = {
        nome: nome.toLowerCase().trim(),
        senha: senha.trim(),
        cpf: cpf.trim(),
        dataDeNascimento: dataNasc,
        email,
        dataCriada: `${data.getUTCDate()}/${
          data.getMonth() + 1
        }/${data.getFullYear()}`
      }

      usuarios.push(usuario)
      localStorage.setItem('cadastrados', JSON.stringify(usuarios))
      alert('Usuário cadastrado com sucesso!')
      location.assign('../Login/login.html')
    } else {
      alert('Usuário já existente!')
    }
  }
}

function validateFields() {
  let invalido = false

  if (nome_storage.value.length <= 2 || nome_storage.value.trim().length == 0) {
    invalido = true
    document.getElementById('error-nome').innerHTML = `Mínimo de 3 caracteres`
    setTimeout(() => {
      document.getElementById('error-nome').innerHTML = ``
    }, 3000)
  }

  if (
    senha_storage.value.length < 6 ||
    senha_storage.value.length > 10 ||
    senha_storage.value.trim().length == 0
  ) {
    invalido = true
    document.getElementById(
      'error-senha'
    ).innerHTML = `A senha deve ter entre 6-10 caracteres`
    setTimeout(() => {
      document.getElementById('error-senha').innerHTML = ``
    }, 3000)
  }

  if (cpf_storage.value.length != 11) {
    invalido = true
    document.getElementById(
      'error-cpf'
    ).innerHTML = `CPF tem que ter, exatamente, 11 dígitos`
    setTimeout(() => {
      document.getElementById('error-cpf').innerHTML = ``
    }, 3000)
  }

  if (email_storage.value.length == 0) {
    invalido = true
    document.getElementById('error-email').innerHTML = `E-mail necessário`
    setTimeout(() => {
      document.getElementById('error-email').innerHTML = ``
    }, 3000)
  }

  if (data_nasc.value.length == 0) {
    invalido = true
    document.getElementById('error-data').innerHTML =
      'Data de nascimento necessária'
    setTimeout(() => {
      document.getElementById('error-data').innerHTML = ``
    }, 3000)
  }

  return invalido
}

function search_usuario(cpf) {
  let index = usuarios.findIndex(element => {
    return element.cpf === cpf
  })
  return index
}

form.addEventListener('submit', cadastrar)
