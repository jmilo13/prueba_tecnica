let listOfProducts = []
const form = document.querySelector("form")
let customCode

const addProduct = (e) => {
  const code = document.querySelector('#code').value
  const name = document.querySelector('#name').value
  const color = document.querySelector('#color').value
  const weight = document.querySelector('#weight').value
  const amount = document.querySelector('#amount').value

  const newProduct = { code, name, color, weight, amount }
  const messageRequired = document.querySelector("#error-message1")
  const message = document.querySelector("#error-message2")
  messageRequired.classList.remove("show")
  message.classList.remove("show")
  if(!code || !name || !color || !weight || !amount) {
    messageRequired.classList.add("show")
    return
  }
  const filter = listOfProducts.filter(obj => Object.values(obj).some(value =>  value == code))
  const isProduct = filter.length > 0
  
  if(isProduct){
    message.classList.add("show")
  }else {
    listOfProducts.push(newProduct)
  } 
  render() 
  form.classList.remove("show")
}

const getAmount = () => {
  let total = 0
  listOfProducts.map(item => total = total + Number(item.amount))
  const totalContainer = document.querySelector("#totalContainer")
  totalContainer.textContent = total
}

const openForm = (code) => {
  form.className == "update" && form.classList.remove("update")
  if(code) {
    const filter = listOfProducts.filter(obj => Object.values(obj).some(value =>  value == code))

    document.querySelector('#code').value = filter[0].code
    document.querySelector('#name').value = filter[0].name
    document.querySelector('#color').value = filter[0].color
    document.querySelector('#weight').value = filter[0].weight
    document.querySelector('#amount').value = filter[0].amount

    form.classList.add("update")
  }else {
    document.querySelector('#code').value = ""
    document.querySelector('#name').value = ""
    document.querySelector('#color').value = ""
    document.querySelector('#weight').value = ""
    document.querySelector('#amount').value = ""
  }
  form.classList.add("show")
  customCode = code
}

const updateProduct = () => {
  const code = document.querySelector('#code').value
  const name = document.querySelector('#name').value
  const color = document.querySelector('#color').value
  const weight = document.querySelector('#weight').value
  const amount = document.querySelector('#amount').value
  listOfProducts.map( item => {
    if(item.code == customCode){
      item.name =  name
      item.color =  color
      item.weight =  weight
      item.amount =  amount
    } 
  })
  render()
  form.classList.remove("show")
  form.classList.remove("update")

}
const deleteProduct = (code) => {
  const newList = listOfProducts.filter (item => item.code !== code)
  listOfProducts = [...newList]
  render()
}

const render = () => {
  const tbody = document.querySelector("#tbody")
  const finalHtml = listOfProducts.map( item => 
    `
    <tr id=${item.code} class="row">
      <td>${item.code}</td>
      <td>${item.name}</td>
      <td>${item.color}</td>
      <td>${item.weight}</td>
      <td>${item.amount}</td>
      <td><button type="button" class="icon-button icon-button--edit" onclick="openForm('${item.code}')"></button></td>
      <td><button type="button" class="icon-button icon-button--delete" onclick="deleteProduct('${item.code}')"></button></td>
    </tr>
    `
  )
  const html = finalHtml.join("")
  tbody.innerHTML = [html]
}

const cancelAction = () => {
  form.classList.remove("show")
}

