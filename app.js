let buttonAllParametersCheckerExercises = document.querySelector(
  "#buttonAllParametersCheckerExercises"
);

let checkboxTypeExercise = document.querySelectorAll(
  'input[name="typeOfExercises"]:checked'
);

//Define checked checkboxes values

let valuesTypeOfMussles = [];
let valuesTypeOfExercises = [];
let valuesTypeOfDifficulty = [];

//Made 3 arrays of checked checkboxes values

let valuesTypeOfMusslesAll = [];
let valuesTypeOfExercisesAll = [];
let valuesTypeOfDifficultyAll = [];

let myChosenExercises = [];

let apiKey = "e2tk2aVVqC7JgZSqYZMu0w==XUAmhHQElchlx6Fi";

// Get Exercises For The Input Checkbox Values

const fetchExerciseByAllCheckboxes = () => {
  //receive checked checkboxes

  let checkboxesTypeOfDifficulty = document.querySelectorAll(
    'input[name="typeOfDifficulty"]:checked'
  );
  let checkboxesTypeOfMussles = document.querySelectorAll(
    'input[name="typeOfMussles"]:checked'
  );
  let checkboxesTypeOfExercises = document.querySelectorAll(
    'input[name="typeOfExercises"]:checked'
  );

  // receive checkboxes for fetch

  checkboxesTypeOfExercises.forEach((checkbox) => {
    valuesTypeOfExercises.push(checkbox.value);
  });
  console.log(valuesTypeOfExercises);

  checkboxesTypeOfMussles.forEach((checkbox) => {
    valuesTypeOfMussles.push(checkbox.value);
  });
  console.log(valuesTypeOfMussles);

  checkboxesTypeOfDifficulty.forEach((checkbox) => {
    valuesTypeOfDifficulty.push(checkbox.value);
  });
  console.log(valuesTypeOfDifficulty);

  //fetch an arrays of exersises for all chosen types

  valuesTypeOfExercises.forEach((type) =>
    fetch("https://api.api-ninjas.com/v1/exercises?type=" + `${type}`, {
      headers: { "X-Api-Key": apiKey },
      contentType: "application/json",
    })
      .then((res) => res.json())
      .then((resultType) => {
        for (let i = 0; i < resultType.length; i++) {
          valuesTypeOfExercisesAll.push(resultType[i]);
          cardConstructor("name", resultType[i]);
        }
      })
      .catch((error) => console.log(error))
  );

  //Check if the fetching types in array are working
  console.log(valuesTypeOfExercisesAll);

  //fetch an array of exersises for all chosen groups of mussles

  valuesTypeOfMussles.forEach((muscle) =>
    fetch("https://api.api-ninjas.com/v1/exercises?muscle=" + `${muscle}`, {
      headers: { "X-Api-Key": apiKey },
      contentType: "application/json",
    })
      .then((res) => res.json())
      .then((resultMuscle) => {
        for (let i = 0; i < resultMuscle.length; i++) {
          valuesTypeOfMusslesAll.push(resultMuscle[i]);
          cardConstructor("name", resultMuscle[i]);
        }
      })

      .catch((error) => console.log(error))
  );

  //Check if the fetching mussles in array is working
  console.log(valuesTypeOfMusslesAll);

  //fetch an array of exersises for all chosen difficulties

  valuesTypeOfDifficulty.forEach((difficulty) =>
    fetch(
      "https://api.api-ninjas.com/v1/exercises?difficulty=" + `${difficulty}`,
      {
        headers: { "X-Api-Key": apiKey },
        contentType: "application/json",
      }
    )
      .then((res) => res.json())
      .then((resultdifficulty) => {
        for (let i = 0; i < resultdifficulty.length; i++) {
          valuesTypeOfDifficultyAll.push(resultdifficulty[i]);
          cardConstructor("name", resultdifficulty[i]);
        }
      })
      .catch((error) => console.log(error))
  );

  //Check if the fetching difficulties in array is working
  console.log(valuesTypeOfDifficultyAll);
};

let cardConstructor = (property, value) => {
  let cardArticle = document.createElement("article");
  cardArticle.innerHTML = `
                        <div class="exerciseCard">
                          <h4 class="nameExercise">${value.name}</h4>
                          <p class="typeExercise"><span class="property-exercise"></span><span class="value-exercise">${"Type of exercises:"} ${
    value.type
  }</span></p>
                          <p class="muscleExercise">${"Mussles:"} ${
    value.muscle
  }</p>
                          <p class="equipmentExercise">${"Equipment you need:"} ${
    value.equipment
  }</p>
                          <p class="difficultyExercise">${"Level of difficulty:"} ${
    value.difficulty
  }</p>
                          <p class="instructionsExercise">${"What to do:"} ${
    value.instructions
  }</p>
                        </div> 
                        <button class="info-button">+ info</button>`;

  document.querySelector("#resultNameExercise").appendChild(cardArticle);
};

// Handle the button after the checkboxes were completed

buttonAllParametersCheckerExercisesHandler = (event) => {
  event.preventDefault();
  fetchExerciseByAllCheckboxes();
};

// Add eventlistener

buttonAllParametersCheckerExercises.addEventListener(
  "click",
  buttonAllParametersCheckerExercisesHandler
);
