const boxContainer = document.getElementById("box-container");

// Create a 4 by 4 grid
let boxesArray = Array.from({ length: 4 }, (_, rowIndex) => {
    return Array.from({ length: 4 }, (_, colIndex) => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `${rowIndex * 4 + colIndex}`; // Display the index in a grid format
        newDiv.classList.add("box");
        return newDiv;
    });
});

// Function to render the boxes in a grid format with a class for each row
const renderTable = () => {
    return boxesArray.map((row, rowIndex) => {
        return `<div class="row">` + 
            row.map((div) => div.outerHTML).join('') + 
            `</div>`;
    }).join(''); // Join rows to return the full HTML string
};

// Insert the rendered grid into the container
boxContainer.innerHTML = `<div class='table'>
${renderTable()} 
</div>`;

const table = document.querySelector(".table");
console.log(table);