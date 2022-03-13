class Result {
  constructor(value, stars, link) {
    this.parent = document.querySelector(".results");
    this.value = value;
    this.stars = stars;
    this.link = link;
  }
  create() {
    // create elements
    let div = document.createElement("div");
    let p = document.createElement("p");
    let textValue = document.createTextNode(this.value);

    // create button elements
    let divButtons = div.cloneNode();
    let span = document.createElement("span");
    let spanTextValue = document.createTextNode(`${this.stars} stars`);
    let button = document.createElement("button");
    let buttonTextValue = document.createTextNode("Visit");

    // classes
    div.classList.add("result");
    divButtons.classList.add("left");

    // append text values
    p.append(textValue);
    span.append(spanTextValue);
    button.append(buttonTextValue);

    // append childs
    divButtons.append(span);
    divButtons.appendChild(button);

    // append mains elemnts
    div.append(p);
    div.append(divButtons);
    this.parent.append(div);

    // add as property
    this.result = div;
    this.button = button;

    // visit function
    this.visit();
  }
  visit() {
    setInterval(() => {
      this.button.onclick = () => {
        window.open(this.link);
      };
    });
  }
}

class Search {
  constructor(username) {
    this.username = username;
  }
  async getValue() {
    let response = await fetch(
      `https://api.github.com/users/${this.username}/repos`
    );
    let data = await response.json();
    return data;
  }
  async display() {
    this.data = await this.getValue();
    for (let i = 0; i < this.data.length; i++) {
      let result = new Result(
        this.data[i].name,
        this.data[i].stars || 0,
        this.data[i].svn_url
      );
      result.create();
    }
  }
  deleteLastSearchResults() {
    // delete the last search results
    let results = document.querySelectorAll(".result");

    if (results.length == 0) return;
    results.forEach((e) => e.remove());
  }
}

// search event

let searchButton = document.querySelector(".submit");
let searchValue = document.querySelector(".value");

searchButton.addEventListener("click", () => {
  if (searchValue == "") return;
  let search = new Search(searchValue.value);
  search.deleteLastSearchResults();
  search.display();
});

window.addEventListener("keyup", (key) => {
  if (key.keyCode === 13) {
    searchButton.click();
  }
});
