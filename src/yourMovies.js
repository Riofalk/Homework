if (JSON.parse(localStorage.getItem('myMovies')) !== null) list = JSON.parse(localStorage.getItem('myMovies'));



function generateMovies() {
    let table = document.getElementById("your-movies");
    let index = -1;
    

    for (let element of list) {
        index++; 
      if(!element.inCart) continue
      let row = table.insertRow();
      row.id = `row-${index}`;
      for (key in element) {
        if (key == "inCart") continue;
        if (key == "stock") continue;
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);    
        cell.appendChild(text);

        if(key == "genre") {
          let cell = row.insertCell();
          let text = document.createTextNode("");    
          cell.appendChild(createDecrBtn(index))
          cell.appendChild(creatInput(index))
          cell.appendChild(createIncrBtn(index))
        }
        
      }
      let cell = row.insertCell();
      cell.appendChild(createBtn(index)); 
    }
    if(!isEmpty()) hideTable() 
  }

  function creatInput(id) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", `input${id}`)
    input.value = "12h"
    return input
  }

  function removeMovie(id) {
    const row = document.getElementById(`row-${id}`)
    row.remove();
    list[id].inCart = false;
    list[id].stock++;
    localStorage.setItem('myMovies', JSON.stringify(list)); 
    if(!isEmpty()) hideTable() 
  }

  function isEmpty() { 
    let table = document.getElementById("your-movies")
    return table.hasChildNodes()
  }

  function hideTable() {
    let tableContainer = document.getElementsByClassName("table-container")[0]
    tableContainer.style.display = "none"
    let emptyTitle = document.getElementById("emptyBasket")
    emptyTitle.classList.remove("hidden")
  }

  function createBtn(id) {
    let btn = document.createElement("button");
    btn.innerHTML = "Remove";
    btn.classList.add("remove-button");
    btn.setAttribute("id", `remove-button${id}`)
    btn.setAttribute("onclick", `removeMovie(${id})`);
    return btn
  }

  function createDecrBtn(id) {
    let btn = document.createElement("button");
    btn.innerHTML = "<";
    btn.setAttribute("id", `decr-button${id}`)
    btn.setAttribute("onclick", `decrHours(${id})`);
    return btn
  }

  function createIncrBtn(id) {
    let btn = document.createElement("button");
    btn.innerHTML = ">";
    btn.setAttribute("id", `incr-button${id}`)
    btn.setAttribute("onclick", `incrHours(${id})`);
    return btn
  }

  function incrHours(id) {
    let input = document.getElementById(`input${id}`)
    let inputValue = parseInt(input.value.slice(0,-1));
    if(inputValue >= 168) return
    input.value = `${inputValue+12}h`
  }

  function decrHours(id) {
    let input = document.getElementById(`input${id}`)
    let inputValue = parseInt(input.value.slice(0,-1));
    if(inputValue <= 12) return
    input.value = `${inputValue-12}h`
  }

