const form = document.getElementById('form-login')
form.addEventListener('submit', login)
let usuarios = []
if (localStorage.getItem('cadastrados'))
  usuarios = JSON.parse(localStorage.getItem('cadastrados'))

function login(event) {
  event.preventDefault()
  let cpf_storage = document.getElementById('cpf').value
  let senha_storage = document.getElementById('senha').value

  if (search_usuario(cpf_storage, senha_storage) != -1) {
    alert('Usuário validado! Bem-vindo!')
    location.assign('../Home/home.html')
  } else {
    alert('Usuário não validado!')
  }
}

function search_usuario(cpf_storage, senha_storage) {
  let index = usuarios.findIndex(element => {
    return element.cpf == cpf_storage && element.senha == senha_storage
  })

  return index
}
