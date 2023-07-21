'use strict';
let arrayOfProducts = [];
let votingRounds = 25;
let arrayOfRNG = [-1,-1,-1];
let arrayOfPreviousRNG = [-1,-1,-1];

let imgSection = document.getElementById('image-section');
let imgOne = document.getElementById('img1');
let imgTwo = document.getElementById('img2');
let imgThree = document.getElementById('img3');
let btnResults = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('results-container');
let ctx = document.getElementById('myChart');


function Product(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = 'img/odd-duck/' + name + '.' + imageExtension;
  this.votes = 0;
  this.views = 0;
}

function rng(){
  return Math.floor(Math.random() * arrayOfProducts.length);
}

function displayImages(){
  for (let index = 0; index < arrayOfRNG.length; index++) {
    let rngIndex = rng();
    while(arrayOfPreviousRNG.includes(rngIndex) || arrayOfRNG.includes(rngIndex)){
      rngIndex = rng();
    }
    arrayOfRNG[index] = rngIndex;
  }
  let rgImageOne = arrayOfRNG[0];
  let rgImageTwo = arrayOfRNG[1];
  let rgImageThree = arrayOfRNG[2];
  arrayOfPreviousRNG = [arrayOfRNG[0],arrayOfRNG[1],arrayOfRNG[2]];

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

function displayChart(){
  let arrayOfProductNames = [];
  let arrayOfProductViews = [];
  let arrayOfProductVotes = [];
  for (let index = 0; index < arrayOfProducts.length; index++) {
    arrayOfProductNames[index] = arrayOfProducts[index].name;
    arrayOfProductViews[index] = arrayOfProducts[index].views;
    arrayOfProductVotes[index] = arrayOfProducts[index].votes;
  }
 console.log(arrayOfProductNames,arrayOfProductViews, arrayOfProductVotes);
  let chartResults ={
    type: 'bar',
    data: {
      labels: arrayOfProductNames,
      datasets: [{
        label: '# of Views',
        data: arrayOfProductViews,
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: arrayOfProductVotes,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, chartResults);
}


function handleShowResults(){
  if(votingRounds === 0){
    btnResults.removeEventListener('click', handleShowResults);
    displayChart();
  }
}


// expample of full image path: let bagProduct = new Product('bag',img/odd-duck/bag.jpg)
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

arrayOfProducts.push(bagProduct, bananaProduct, bathroomProduct, bootsProduct, breakfastProduct, bubblegumProduct , chairProduct, cthulhuProduct,dogduckProduct,dragonProduct,penProduct, petsweepProduct, scissorsProduct, sharkProduct, sweepProduct, tauntunProduct, unicornProduct, watercanProduct, wineglassProduct);

displayImages();

imgSection.addEventListener('click', handleImgClick);
btnResults.addEventListener('click', handleShowResults);
