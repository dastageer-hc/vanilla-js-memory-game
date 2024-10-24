const boxContainer = document.getElementById("box-container");

// Create a 4 by 4 grid
let boxesArray = Array.from({ length: 4 }, (_, rowIndex) => {
  return Array.from({ length: 4 }, (_, colIndex) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `${rowIndex + 1 * 4 + colIndex}`; // Display the index in a grid format
    newDiv.classList.add("box");
    newDiv.setAttribute("card-number", rowIndex * 4 + colIndex);
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
          .map(
            (div, index) => `<div class='outer-div' data-card-number='${index}'>
    
            ${div.outerHTML}
            </div>`
          )
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
table.addEventListener("click", (event) => {
  console.log(event.target, "evnet");
});
console.log(table);
