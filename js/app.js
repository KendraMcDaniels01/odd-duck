'use strict';
let arrayOfProducts = [];
let votingRounds = 25;


let imgSection = document.getElementById('image-section');
let imgOne = document.getElementById('img1');
let imgTwo = document.getElementById('img2');
let imgThree = document.getElementById('img3');
let btnResults = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');


function Product(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = 'img/odd-duck/' + name + '.' + imageExtension;
  this.votes = 0;
  this.views = 0;
}

function displayImages(){
  let rgImageOne = rng();
  let rgImageTwo = rng();
  let rgImageThree = rng();
  while(rgImageOne === rgImageTwo){
    rgImageTwo = rng();
  }
  while(rgImageOne === rgImageThree || rgImageTwo === rgImageThree){
    rgImageThree = rng();
  }
  imgOne.src = arrayOfProducts[rgImageOne].image;
  imgOne.title = arrayOfProducts[rgImageOne].name;
  imgTwo.src = arrayOfProducts[rgImageTwo].image;
  imgTwo.title = arrayOfProducts[rgImageOne].name;
  imgThree.src = arrayOfProducts[rgImageThree].image;
  imgThree.title = arrayOfProducts[rgImageOne].name;
  arrayOfProducts[rgImageOne].views++;
  arrayOfProducts[rgImageTwo].views++;
  arrayOfProducts[rgImageThree].views++;
}

function rng(){
  return Math.floor(Math.random() * arrayOfProducts.length);
}

function handleImgClick(event){
  let imageClicked = event.target.title;
  for (let index = 0; index < arrayOfProducts.length; index++) {
    if(imageClicked === arrayOfProducts[index].name){
      arrayOfProducts[index].votes++;
    }
  }
  votingRounds--;
  displayImages();
  if(votingRounds === 0){
    imgSection.removeEventListener('click',handleImgClick);
  }
}

function handleShowResults(){
  if(votingRounds === 0){
    for (let index = 0; index < arrayOfProducts.length; index++) {
      let listProducts = document.createElement('li');
      listProducts.textContent = arrayOfProducts[index].name + ' - Votes: ' + arrayOfProducts[index].votes + ' & Views: ' + arrayOfProducts[index].views;
      resultsList.appendChild(listProducts);
    }
    btnResults.removeEventListener('click', handleShowResults);
  }
}
// let bagProduct = new Product('bag',img/odd-duck/bag.jpg)
let bagProduct = new Product('bag');
let bananaProduct = new Product('banana');
let bathroomProduct = new Product('bathroom');
let bootsProduct = new Product('boots');
let breakfastProduct = new Product('breakfast');
let bubblegumProduct = new Product('bubblegum');
let chairProduct = new Product('chair');
let cthulhuProduct = new Product('cthulhu');
let dogduckProduct = new Product('dog-duck');
let dragonProduct = new Product('dragon');
let penProduct = new Product('pen');
let petsweepProduct = new Product('pet-sweep');
let scissorsProduct = new Product('scissors');
let sharkProduct = new Product('shark');
let sweepProduct = new Product('sweep', 'png');
let tauntunProduct = new Product('tauntaun');
let unicornProduct = new Product('unicorn');
let watercanProduct = new Product('water-can');
let wineglassProduct = new Product('wine-glass');

arrayOfProducts.push(bagProduct, bananaProduct, bathroomProduct, bootsProduct, breakfastProduct, bubblegumProduct, chairProduct, cthulhuProduct,dogduckProduct,dragonProduct,penProduct, petsweepProduct, scissorsProduct, sharkProduct, sweepProduct, tauntunProduct, unicornProduct, watercanProduct, wineglassProduct);

displayImages();

imgSection.addEventListener('click', handleImgClick);
btnResults.addEventListener('click', handleShowResults);
