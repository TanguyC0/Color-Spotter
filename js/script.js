

class colorSpotter
{
    constructor(row,col)
    {
        this.rowMin = row;
        this.colMin = col;
        this.score = 0;
        this.color;
        this.oddColor;
    }

    getRandomColors()
    {
        var ratio = 0.618033988749895;
    
        var hue = (Math.random() + ratio) % 1;
        var saturation = Math.round(Math.random() * 100) % 85;
        var lightness = Math.round(Math.random() * 100) % 85;

        var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
        var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

        this.color = color;
        this.oddColor = oddColor;
    }

    randomCase(nb)
    {
        return Math.floor(Math.random() * nb);
    }

    generateTable(el, rows, cols,nb) 
    {
        var tmp=0;
        let score = document.createElement("h1");
        score.innerHTML = "Score : " + this.score;

        let tabl = document.createElement("table");
    
        //create coloring board
        for (let i = 0; i < rows; i++) 
        {
            let row = document.createElement("tr");
            for (let j = 0; j < cols; j++) 
            {
                let col = document.createElement("td");
                row.appendChild(col);

                if(tmp != nb)
                {
                    col.className = "color-one";
                }
                else
                {
                    col.className = "color-two";
                }
                tmp++;
            }
            tabl.appendChild(row);
        }
        let row = document.createElement("tr");
        
        //add table to element
        let element = document.getElementById("grid");
        element.appendChild(score);
        element.appendChild(tabl);
    }

    updateStyle()
    {

        let elem = document.getElementsByClassName("color-one");
        for(let i = 0; i < elem.length; i++)
        {
            elem[i].style.backgroundColor = this.color;
        }

        elem = document.getElementsByClassName("color-two");
        elem[0].style.backgroundColor = this.oddColor;

    }

    addEvent()
    {
        let elem = document.getElementsByClassName("color-one");
        for(let i = 0; i < elem.length; i++)
        {
            elem[i].addEventListener("click", function()
            {
                game.deleteTable();
                game.score = 0;
                game.gameLoop();
            });
        }

        elem = document.getElementsByClassName("color-two");
        elem[0].addEventListener("click", function()
        {
            game.deleteTable();
            game.score++;
            game.gameLoop();
        });
    }

    deleteTable()
    {
        let element = document.getElementById("grid");
        element.innerHTML = "";
    }

    gameLoop()
    {
        console.log("score : " + this.score);
        this.getRandomColors();
        let nb = this.randomCase((this.colMin+this.score)*(this.rowMin+this.score));
        this.generateTable("grid",this.colMin+this.score,this.rowMin+this.score,nb);
        this.updateStyle();
        this.addEvent();
    }
}

let game = new colorSpotter(3,3);
game.gameLoop();Math.floor(Math.random() * 10);