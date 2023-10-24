// Create Dino Constructor
class Dino {
  constructor(species, weight, height, diet, where, when, fact, humanObj) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.humanObj = humanObj;
  }

  compareHeight() {
    const dinoHeight = this.height;
    const humanHeight = this.humanObj.height;

    if (dinoHeight > humanHeight) {
      const heightDifference = dinoHeight - humanHeight;
      return `The ${this.species} was ${heightDifference} inches bigger than you`;
    } else {
      const heightDifference = humanHeight - dinoHeight;
      return `You are ${heightDifference} inches bigger than the ${this.species} was.`;
    }
  }

  compareWeight() {
    const dinoWeight = this.weight;
    const humanWeight = this.humanObj.weight;

    if (dinoWeight > humanWeight) {
      const weightDifference = dinoWeight - humanWeight;
      return `The ${this.species} was ${weightDifference} lbs heavier than you`;
    } else {
      const weightDifference = humanWeight - dinoWeight;
      return `You are ${weightDifference} lbs heavier than the ${this.species} was.`;
    }
  }

  compareDiet() {
    const dinoDiet = this.diet;
    const humanDiet = this.humanObj.diet;

    if (dinoDiet === humanDiet) {
      return `You and the ${this.species} are both ${dinoDiet}s`;
    } else {
      return `You are a ${humanDiet} and the ${this.species} was a ${dinoDiet}`;
    }
  }
}

class Human {
  constructor(name, feet, inches, weight, diet) {
    this.name = name;
    this.feet = feet;
    this.inches = inches;
    this.weight = weight;
    this.diet = diet;
  }
}

// create a function to return a random fact
function ReturnRandomFact(dino) {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    switch (randomNumber) {
        case 1:
        return dino.compareHeight();
        case 2:
        return dino.compareWeight();
        case 3:
        return dino.compareDiet();
        case 4:
        return dino.fact;
    }
}

// Use IIFE to get human data from form
(function () {
  const nameElement = document.getElementById("name");
  const feetElement = document.getElementById("feet");
  const inchesElement = document.getElementById("inches");
  const weightElement = document.getElementById("weight");
  const dietElement = document.getElementById("diet");
  const btnElement = document.getElementById("btn");


  btnElement.addEventListener("click", function () {

    const name = nameElement.value;
    const feet = parseInt(feetElement.value, 10);
    const inches = parseInt(inchesElement.value, 10);
    const weight = parseFloat(weightElement.value);
    const diet = dietElement.value;

    //create human object
    const human = new Human(name, feet, inches, weight, diet);

    //hide form
    document.getElementById("dino-compare").style.display = "none";
    human_done = false;

    //for loop for each dino in DINO_DATA
    for (let i = 0; i < 8; i++) {
      if (i === 4 && human_done === false) {
        //create grid item
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        //create h3 element
        const h3 = document.createElement("h3");
        h3.innerText = human.name;
        gridItem.appendChild(h3);

        //create image element
        const img = document.createElement("img");
        img.src = `images/human.png`;
        gridItem.appendChild(img);

        human_done = true;
        i -= 1;

        //add grid item to DOM
        document.getElementById("grid").appendChild(gridItem);
      } else {
        //create dino object
        const dino = new Dino(
          DINO_DATA[i].species,
          DINO_DATA[i].weight,
          DINO_DATA[i].height,
          DINO_DATA[i].diet,
          DINO_DATA[i].where,
          DINO_DATA[i].when,
          DINO_DATA[i].fact,
          human
        );

        //create grid item
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        //create h3 element
        const h3 = document.createElement("h3");
        h3.innerText = dino.species;
        gridItem.appendChild(h3);

        //create image element
        const img = document.createElement("img");
        img.src = `images/${dino.species.toLowerCase()}.png`;
        gridItem.appendChild(img);

        //create p element
        const p = document.createElement("p");
        if (dino.species === "Pigeon") {
            p.innerText = dino.fact;
        } else {
            p.innerText = ReturnRandomFact(dino);
        }
        
        gridItem.appendChild(p);

        //add grid item to DOM
        document.getElementById("grid").appendChild(gridItem);
      }
    }
  });
})();