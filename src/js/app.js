// utility methods
export function generateRandomBoxNumber(params) {
  const randomNumber = [...params];
  for (let i = 0; i < randomNumber.length; i++) {
    const randomIndex = Math.floor(Math.random() * randomNumber.length);
    [randomNumber[i], randomNumber[randomIndex]] = [
      randomNumber[randomIndex],
      randomNumber[i],
    ];
  }
  return randomNumber;
}

const boxContainer = document.getElementById("boxes-container");

// const newSet = new Set(
//   Array.from({ length: 8 }).map(
//     (_, index) => Math.floor(Math.random() + 1 * 16) + index
//   )
// );

// const randomBoxNumbers = newSet.flatMap((i) => [i, i]);
const randomSet = new Set();
const grid_size = 4 * 4;

while (randomSet.size < 8) {
  randomSet.add(Math.floor((Math.random() + 1) * grid_size));
}
const duplicateBoxNumber = [...randomSet].flatMap((element) => {
  return [element, element];
});

let randomBoxNumbers = generateRandomBoxNumber(duplicateBoxNumber);

// Create a 4 by 4 grid
let boxesArray = Array.from({ length: 4 }, (_, rowIndex) => {
  return Array.from({ length: 4 }, (_, colIndex) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `${randomBoxNumbers[rowIndex * 4 + colIndex]}`; // Display the index in a grid format
    newDiv.classList.add("box", "box-back");
    newDiv.setAttribute(
      "data-box-number",
      randomBoxNumbers[rowIndex * 4 + colIndex]
    );
    return newDiv;
  });
});

// Function to render the boxes in a grid format with a class for each row
const renderTable = () => {
  return boxesArray
    .map((row, rowIndex) => {
      return (
        `<div class="row">` +
        row
          .map((div) => {
            return `
                <div class='box-container' >
                 <div class='box box-front' data-box-number='${div.getAttribute(
                   "data-box-number"
                 )}'>
                  ?
                 </div>
                  ${div.outerHTML}
                </div>`;
          })
          .join("") +
        `</div>`
      );
    })
    .join(""); // Join rows to return the full HTML string
};

// Insert the rendered grid into the container
boxContainer.innerHTML = `<div class='table'>
${renderTable()} 
</div>`;

const table = document.querySelector(".table");

// ----- game logic -----
let score = 0;
const scoreDiv = document.querySelector(".score");
scoreDiv.innerHTML = "0";
let currentSelectedPair = [];

function checkPair() {
  currentSelectedPair.map((target) => {
    target.parentNode.classList.add("active");
    target.parentNode.setAttribute("data-matched", 1);
  });

  if (currentSelectedPair.length == 2) {
    if (
      currentSelectedPair[0]?.getAttribute("data-box-number") ===
      currentSelectedPair[1]?.getAttribute("data-box-number")
    ) {
      currentSelectedPair.map((target) => {
        target.parentNode.classList.add("match-animation");
      });
      score++;
      scoreDiv.innerHTML = `${score}`;
    } else {
      currentSelectedPair.map((target) => {
        setTimeout(() => {
          target.parentNode.classList.remove("active");
          target.parentNode.setAttribute("data-matched", 0);
        }, 400);
      });
    }

    currentSelectedPair = [];
  }
}

// ----- game logic -----

// attach event handler
table.addEventListener("click", (event) => {
  if (event.target.parentNode.classList.contains("box-container")) {
    if (!Number(event.target.parentNode.getAttribute("data-matched"))) {
      if (currentSelectedPair.length < 2) {
        currentSelectedPair.push(event.target);
      }
    }
    checkPair();
  }
});

const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", (event) => {
  score = 0;
  scoreDiv.innerHTML = score;
  const divArray = Array.from(document.querySelectorAll(".box-container"));
  divArray.map((div) => {
    div.classList.remove("active", "match-animation");
    div.removeAttribute("data-matched");
  });
  randomBoxNumbers= generateRandomBoxNumber(divArray);
});
