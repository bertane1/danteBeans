//! Bertan Erdoğan Frontend Bitirme Projesi 
const wrapperDaily = document.querySelector('.wrapper-daily')
const wrapperProducts = document.querySelector('.wrapper-products')
const wrapperCart = document.querySelector('.wrapper-cart')
const idProduct = document.getElementById('product')
const idbestSeller = document.getElementById('bestSeller')
let totalPrice = document.getElementById('totalPrice')
let scrollUpBtn = document.getElementById('scroll-top')
const btnAll = document.querySelector('.btn-all')
const btnCentral = document.querySelector('.btn-centralAmerica')
const btnAfrica = document.querySelector('.btn-africa')
const btnSouth = document.querySelector('.btn-southAmerica')
const btnAsia = document.querySelector('.btn-asia')
const btnMiddle = document.querySelector('.btn-middleEast')
let shopList = []
let total = 0

//+ api fetch
async function fetchData() {
  const api = 'https://fake-coffee-api.vercel.app/api'
  try {
    const response = await axios.get(api);
    if(idbestSeller){
      promotion(response.data)
    }else{
      urunListele(response.data);
    }
  } catch (error) {
    console.error(error);
  }
}
fetchData()

//+ Ürün yazdırma fonksiyonları 
function promotion(data){
  let random = Math.floor(Math.random()*20)
  for(let i=random;i<=(random+1);i++){
    let name = data[i].name
    let price = data[i].price
    let region = data[i].region
    let desc = data[i].description
    let img = data[i].image_url
    let card = document.createElement('div')
    card.classList.add('card', 'mb-3', 'border', 'border-0', 'best-selling')
    card.innerHTML =
    `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${img}" class="img-fluid" alt="${name}">
        </div>
        <div class="col-md-8">
          <div class="card-body text-center">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${desc}</p>
            <p class="card-text">Region: ${region}</p>
            <p class="card-text">${price}$</p>
            <button onclick="addToCart('${name}',${price},'${img}')" class="btn btn-secondary">Add to cart</button>
          </div>
        </div>
      </div>
    `
    wrapperDaily.append(card)
  }
}
function urunListele(data){
  data.forEach(data => {
    let name = data.name
    let price = data.price
    let region = data.region
    let regionFilter = region.toLowerCase().replaceAll(' ', '')
    let desc = data.description
    let img = data.image_url
    let card = document.createElement('div')
    card.classList.add('card','border','border-0', 'col', regionFilter, 'text-center')
    card.innerHTML =
    `
      <a href="./detail1.html">
        <img src="${img}" alt="" class="card-img-top">
      </a>
      <div class="card-body" >
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${desc}</p>
          <p class="card-text">Region: ${region}</p>
          <p class="card-text">${price}$</p>
          <button onclick="addToCart('${name}',${price},'${img}')" class="btn btn-secondary btn-cart">Add to cart</button>
      </div>
    `
    wrapperProducts.append(card)
  });
}

//+ Sepete Ekle-Sepeti Yazdır
function addToCart(product, price, img){
  shopList.push(
    {
      'productName': product,
      'price': price,
      'img': img
    },
  )
  localStorage.setItem('products', JSON.stringify(shopList))
}
function createCart(){
  let buyerCart = JSON.parse(localStorage.getItem('products'))
  let i = 0
  buyerCart.forEach(data =>{
    let name = data.productName
    let price = data.price
    let img = data.img
    let card = document.createElement('div')
    card.id = `product${i}`
    i++
    card.classList.add('cart', 'row', 'border-top', 'border-bottom')
    card.innerHTML =
    `
    <div class="row main align-items-center">
      <div class="col-2"><img class="img-fluid" src="${img}"></div>
      <div class="col">
          <div class="row">${name}</div>
      </div>
      <div class="col">
          <p class="mt-3">1</p>
      </div>
      <div class="col-2 d-flex justify-content-between mt-3"><p>${price}</p><span class="close" onclick="removeCart(${card.id},${price})">&#10005;</span></div>
    </div>
    `
    wrapperCart.append(card)
    total += price
  })
  totalPrice.textContent = `${(total).toFixed(2)}$`
}
function removeCart(item, price){
  item.style.display = 'none'
  total = total-price
  totalPrice.textContent = `${(total).toFixed(2)}$`
  console.log(total)
}

//+ Scroll up
window.onscroll = function(){toTheTop()}
function toTheTop(){
  if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
    scrollUpBtn.style.display = 'block'
  }else{
    scrollUpBtn.style.display = 'none'
  }
}

//+ Kategori filtreleme
function filterAll(){
  let asia = document.querySelectorAll('.asiapacific')
  let africa = document.querySelectorAll('.africa')
  let southAmerica = document.querySelectorAll('.southamerica')
  let centralAmerica = document.querySelectorAll('.centralamerica')
  let middleEast = document.querySelectorAll('.middleeast')

  africa.forEach(i=>{i.style.display = 'block'})
  asia.forEach(i=>{i.style.display = 'block'})
  southAmerica.forEach(i=>{i.style.display = 'block'})
  centralAmerica.forEach(i=>{i.style.display = 'block'})
  middleEast.forEach(i=>{i.style.display = 'block'})
}
btnAll.addEventListener('click', filterAll)
function filterAsia(){
  let asia = document.querySelectorAll('.asiapacific')
  let africa = document.querySelectorAll('.africa')
  let southAmerica = document.querySelectorAll('.southamerica')
  let centralAmerica = document.querySelectorAll('.centralamerica')
  let middleEast = document.querySelectorAll('.middleeast')

  africa.forEach(i=>{i.style.display = 'none'})
  southAmerica.forEach(i=>{i.style.display = 'none'})
  centralAmerica.forEach(i=>{i.style.display = 'none'})
  middleEast.forEach(i=>{i.style.display = 'none'})
  asia.forEach(i=>{i.style.display = 'block'})
}
btnAsia.addEventListener('click', filterAsia)
function filterAfrica(){
  let asia = document.querySelectorAll('.asiapacific')
  let africa = document.querySelectorAll('.africa')
  let southAmerica = document.querySelectorAll('.southamerica')
  let centralAmerica = document.querySelectorAll('.centralamerica')
  let middleEast = document.querySelectorAll('.middleeast')

  africa.forEach(i=>{i.style.display = 'block'})
  asia.forEach(i=>{i.style.display = 'none'})
  southAmerica.forEach(i=>{i.style.display = 'none'})
  centralAmerica.forEach(i=>{i.style.display = 'none'})
  middleEast.forEach(i=>{i.style.display = 'none'})
}
btnAfrica.addEventListener('click', filterAfrica)
function filterSouth(){
  let asia = document.querySelectorAll('.asiapacific')
  let africa = document.querySelectorAll('.africa')
  let southAmerica = document.querySelectorAll('.southamerica')
  let centralAmerica = document.querySelectorAll('.centralamerica')
  let middleEast = document.querySelectorAll('.middleeast')

  africa.forEach(i=>{i.style.display = 'none'})
  asia.forEach(i=>{i.style.display = 'none'})
  centralAmerica.forEach(i=>{i.style.display = 'none'})
  middleEast.forEach(i=>{i.style.display = 'none'})
  southAmerica.forEach(i=>{i.style.display = 'block'})
}
btnSouth.addEventListener('click', filterSouth)
function filterMiddle(){
  let asia = document.querySelectorAll('.asiapacific')
  let africa = document.querySelectorAll('.africa')
  let southAmerica = document.querySelectorAll('.southamerica')
  let centralAmerica = document.querySelectorAll('.centralamerica')
  let middleEast = document.querySelectorAll('.middleeast')

  africa.forEach(i=>{i.style.display = 'none'})
  asia.forEach(i=>{i.style.display = 'none'})
  southAmerica.forEach(i=>{i.style.display = 'none'})
  centralAmerica.forEach(i=>{i.style.display = 'none'})
  middleEast.forEach(i=>{i.style.display = 'block'})
}
btnMiddle.addEventListener('click', filterMiddle)
function filterCentral(){
  let asia = document.querySelectorAll('.asiapacific')
  let africa = document.querySelectorAll('.africa')
  let southAmerica = document.querySelectorAll('.southamerica')
  let middleEast = document.querySelectorAll('.middleeast')
  let centralAmerica = document.querySelectorAll('.centralamerica')

  africa.forEach(i=>{i.style.display = 'none'})
  asia.forEach(i=>{i.style.display = 'none'})
  southAmerica.forEach(i=>{i.style.display = 'none'})
  middleEast.forEach(i=>{i.style.display = 'none'})
  centralAmerica.forEach(i=>{i.style.display = 'block'})
}
btnCentral.addEventListener('click', filterCentral)

//+ Login-Register
function register(){
  const username = document.getElementById('userSign')
  const userpass = document.getElementById('passSign')

  localStorage.setItem('username', username.value);
  localStorage.setItem('password', userpass.value);
  alert('Your account has been created');
}
function login(){
  const storedName = localStorage.getItem('username');
  const storedPass = localStorage.getItem('password');

  const userLog = document.getElementById('userLog');
  const userPass = document.getElementById('userPass');

  if(userLog.value == storedName && userPass.value == storedPass){
      alert('You are succesfully logged in.');
  }else{
      alert('Wrong username or password.');
  }
}
