console.log("Hello :)");
var resolution = 0;
var symmetry = "2";
var painting = false;

function generateGrid()
{
    resolutionInput = parseInt(document.getElementById("resolutionInput").value);
    //console.log(resolution);
    if (resolutionInput > 0)
    {
        resolution = resolutionInput;

        var previewDiv = document.getElementById("crosswordPreview");
        var crosswordDiv = document.getElementById("crosswordGenerated");
        previewDiv.classList.toggle("hidden");
        crosswordDiv.classList.toggle("hidden");

        crosswordTable = document.getElementById("crosswordGrid");
        for (rowIndex = 0; rowIndex < resolution; rowIndex++)
        {
            //Populate HTML table
            newRow = document.createElement("tr");
            newRow.id = "row" + rowIndex.toString();
            newRow.classList.add("row");
            
            for (cellIndex = 0; cellIndex < resolution; cellIndex++)
            {
                newCell = document.createElement("td");
                newCell.id = CellCoordinatesToID(cellIndex, rowIndex);
                newCell.width = 400/resolution;
                newCell.height = 400/resolution;
                newCell.x = cellIndex;
                newCell.y = rowIndex;
                newCell.classList.add("cell");

                toggleButton = document.createElement("button");
                toggleButton.classList.add("cellToggle");
                toggleButton.x = cellIndex;
                toggleButton.y = rowIndex;
                toggleButton.onclick = function(){ClickOnCell(this)};
                toggleButton.onmouseover = function(){MouseOverCell(this)};
                toggleButton.onmousedown = function(){MouseDownOnCell()};
                toggleButton.onmouseup = function(){MouseUpOnCell()};
                newCell.appendChild(toggleButton);

                if (rowIndex == 0)
                {
                    newCell.classList.add("topEdgeCell");
                }
                if (cellIndex == 0)
                {
                    newCell.classList.add("leftEdgeCell");
                }

                newRow.appendChild(newCell);
            }

            crosswordTable.appendChild(newRow);
        }
    }

}

function updateGridPreview()
{
    resolutionInput = document.getElementById("resolutionInput");
    requestedResolution = parseInt(resolutionInput.value);
    //console.log("Input resolution: " + requestedResolution);
    if (requestedResolution > 0)
    {
        //console.log("Requested resolution: " + requestedResolution);
        
        canvas = document.getElementById("crosswordCanvas");
        ctx = canvas.getContext("2d");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        squareWidth = canvasWidth/requestedResolution;
        squareHeight = canvasHeight/requestedResolution;
        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.strokeStyle = "black";
        for (i = 1; i < requestedResolution; i++)
        {
            //Draw horizontal lines
            ctx.beginPath();
            ctx.moveTo(i*squareWidth, 0);
            ctx.lineTo(i*squareWidth, canvasHeight);
            //Draw Vertical Lines
            ctx.moveTo(0, i*squareHeight);
            ctx.lineTo(canvasWidth, i*squareHeight);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function toggleCell(cellID){
    cell = document.getElementById(cellID);
    cell.classList.toggle("darkCell");

    if (symmetry != "0")
    {
        siblingX = resolution - 1 - cell.x;
        siblingY = resolution - 1 - cell.y;
        siblingID = CellCoordinatesToID(siblingX, siblingY);
        if(siblingID != cellID)
        {
            document.getElementById(siblingID).classList.toggle("darkCell");
        }
        if (symmetry == "2")
        {
            firstTwinID = CellCoordinatesToID(siblingY, cell.x);
            secondTwinID = CellCoordinatesToID(cell.y, siblingX);
            if (firstTwinID != cellID)
            {
                document.getElementById(firstTwinID).classList.toggle("darkCell");
            }
            if (secondTwinID != cell.id)
            {
                document.getElementById(secondTwinID).classList.toggle("darkCell");
            }
        }
    }
}

function MouseUpOnCell(){
    painting = false;
}

function MouseDownOnCell(){
    painting = true;
}

function MouseOverCell(toggle){
    if (painting)
    {
        cellID = CellCoordinatesToID(toggle.x, toggle.y);
        toggleCell(cellID);
    }
}

function ClickOnCell(toggle){
    if (!painting)
    {
        cellID = CellCoordinatesToID(toggle.x, toggle.y);
        toggleCell(cellID);
    }
}

function addInnardsToCell(cell)
{
    newCellNumber = document.createElement("p");
    newCellNumber.id = newCell.id + "Number";
    newCellNumber.classList.add("cellNumber")
    cell.appendChild(newCellNumber);

    newCellText = document.createElement("input");
    newCellText.type = "text";
    newCellText.id = newCell.id + "Text";
    newCellText.classList.add("cellInput");
    cell.appendChild(newCellText);
}

function CellCoordinatesToID(x, y){
    return "r" + y.toString() + "c" + x.toString();
}

function changeSymmetry(radioButton){
    if (radioButton.id == "noSymmetry")
    {
        symmetry = 0;
    }
    else if (radioButton.id == "twoWaySymmetry")
    {
        symmetry = 1;
    }
    else
    {
        symmetry = 2;
    }
}