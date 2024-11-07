console.log("Hello :)");
var resolution = 0;
var symmetry = "2";
var paintColour = "white";
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

}

function changeCellColour(cellID){
    console.log("Changing colour of cell " + cellID + " to " + paintColour);
    cell = document.getElementById(cellID);
    if (paintColour == "black")
    {
        if (!cell.classList.contains("darkCell"))
        {
            cell.classList.add("darkCell");
        }
    }
    if (paintColour == "white")
    {
        if (cell.classList.contains("darkCell"))
        {
            cell.classList.remove("darkCell")
        }
    }
}

function alterCellAndSiblings(cellID){
    console.log("Altering cell" + cellID + " and siblings");

    changeCellColour(cellID);
        
    cell = document.getElementById(cellID);
    rCharIndex = cellID.indexOf("r");
    cCharIndex = cellID.indexOf("c");
    cellY = parseInt(cellID.substring(rCharIndex+1, cCharIndex));
    cellX = parseInt(cellID.substring(cCharIndex+1));
    console.log("Original cell coords parsed: " + cellX + "," + cellY);
    if (symmetry != "0")
    {
        siblingX = resolution - 1 - cellX;
        siblingY = resolution - 1 - cellY;
        siblingID = CellCoordinatesToID(siblingX, siblingY);
        if(siblingID != cellID)
        {
            changeCellColour(siblingID);
            console.log("changing sibling " + siblingID);
        }
        console.log("Resolution: " + resolution + "Original cell coords: " + cellX + "," + cellY + ". Sibling coords: " + siblingX + "," + siblingY);
        if (symmetry == "2")
        {
            firstTwinID = CellCoordinatesToID(siblingY, cellX);
            secondTwinID = CellCoordinatesToID(cellY, siblingX);
            if (firstTwinID != cellID)
            {
                changeCellColour(firstTwinID);
                console.log("changing twin " + firstTwinID);
            }
            if (secondTwinID != cell.id)
            {
                changeCellColour(secondTwinID);
                console.log("changing twin " + secondTwinID);
            }
        }
    }
}


function MouseUpOnCell(){
    //painting = false;
}

function MouseDownOnCell(){
    //painting = false;
}

function MouseOverCell(toggle){
    /*
    if (painting)
    {
        cellID = CellCoordinatesToID(toggle.x, toggle.y);
        alterCellAndSiblings(cellID);
    }
    */
}


function ClickOnCell(toggle){
    console.log("Clicked on cell" + toggle.x + "," + toggle.y)
    if (!painting)
    {
        cellID = CellCoordinatesToID(toggle.x, toggle.y);
        alterCellAndSiblings(cellID);
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
    console.log("symmetry: " + symmetry);
}

function setColourToWhite()
{
    paintColour = "white";
    console.log("Paint colour is now " + paintColour);
}

function setColourToBlack()
{
    paintColour = "black";
    console.log("Paint colour is now " + paintColour);
}