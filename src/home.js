let list = [
  { name: '9 Songs', genre: 'Action', price: '5.00$' , stock: 2, inCart: false},
  { name: 'The Lord of the Rings', genre: 'Action', price: '5.00$' , stock: 1, inCart: false},
  { name: 'The Terminator ', genre: 'Action', price: '5.00$' , stock: 0, inCart: false},
  { name: 'Cube ', genre: 'Action', price: '5.00$' , stock: 1, inCart: false},
  { name: 'The Matrix Reloaded', genre: 'Action', price: '5.00$' , stock: 0, inCart: false},
  { name: 'Harold and Maude', genre: 'Action', price: '5.00$' , stock: 4, inCart: false},
  { name: 'Back to the Future Part III', genre: 'Action', price: '5.00$' , stock: 2, inCart: false},
  { name: 'Amadeus', genre: 'Action', price: '5.00$' , stock: 1, inCart: false},
];

if (JSON.parse(localStorage.getItem('myMovies')) !== null) list = JSON.parse(localStorage.getItem('myMovies'));

function generateTable() {
    let table = document.getElementById("movie-table-body");
    let index = 0;
    for (let element of list) {
      let row = table.insertRow();
      for (key in element) {
        if (key == "inCart") continue;
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);    
        if (key == "stock") {
          if(element[key] > 0) cell.appendChild(availableImg(index));
          else  cell.appendChild(notAvailableImg(index));
          continue
        } 
        cell.appendChild(text);
      }
      let cell = row.insertCell();
      cell.appendChild( createBtn(index, list[index++].inCart));
    }
  }

  function createBtn(id, isRented) {
    let btn = document.createElement("button");
    btn.innerHTML = "Rent";
    btn.classList.add("rent-button");
    btn.setAttribute("id", `rent-button${id}`)
    if(isRented) {
      btn.classList.add("rented")
      btn.innerHTML = "Rented"
    }
    if(!list[id].stock & !list[id].inCart) {
      btn.classList.add("not-available");
      btn.disabled = "disabled"
    }
    btn.setAttribute("onclick", `updateAvailability(${id})`);
    return btn
  }

  function availableImg(id) {
    let img = document.createElement("img");
    img.classList.add("availability")
    img.src = "/assets/available.png";
    img.setAttribute("id", `availability${id}`)
    return img;
  }

  function notAvailableImg(id) {
    let img = document.createElement("img");
    img.classList.add("availability")
    img.setAttribute("id", `availability${id}`)
    img.src = "/assets/not_available.png";
    return img;
  }

  function updateAvailability(id) {
    let {stock} = list[id]
    let button = document.getElementById(`rent-button${id}`)
    let availImg = document.getElementById(`availability${id}`);
  
    if (button.classList.contains("rented")) {
      button.classList.remove('rented')
      button.innerHTML = "Rent";
      if(!list[id].stock++) {availImg.src = "/assets/available.png";}
      list[id].inCart = false;
    } else {
      if (!stock) return;   
      button.classList.add("rented")
      list[id].inCart = true;
      button.innerHTML = "Rented";
      if (!(--list[id].stock)) {
        availImg.src = "/assets/not_available.png"; 
      }
    }
    localStorage.setItem('myMovies', JSON.stringify(list));   
  }