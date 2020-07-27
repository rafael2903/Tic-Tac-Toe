(function(){

    const type = ["show-X","show-O"];
    var count = 0;
    var multiEnabled = 0;

    var items = document.querySelectorAll(".grid-item");
    items.forEach(item => item.addEventListener("click", print));

    const matriz = [[items[0],items[1],items[2]],
                      [items[3],items[4],items[5]],
                      [items[6],items[7],items[8]]];

    var restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", restart);

    var resetButton = document.querySelector("#reset-button");
    resetButton.addEventListener("click", reset);

    var winnerContainer = document.querySelector(".winner-container");

    var options = document.querySelector(".options-container");
    options.addEventListener("click", assign);


    function assign(e) {

        multiEnabled = e.target.id == "multi" ? true : false;

        if(multiEnabled) {
            options.lastElementChild.classList.add("option-selected");
            options.firstElementChild.classList.remove("option-selected");
            restart();
        } else {
            options.firstElementChild.classList.add("option-selected");
            options.lastElementChild.classList.remove("option-selected");
            restart();
        }
        
    }

    function print(e) {

        if(e.target.classList.length == 1 && count == 0) {

            e.target.classList.add(type[count]);
            count = (count + 1) % 2;

            var result = check();
            printResult(result);

            if(!result[0] && !result[1] && !multiEnabled){

                setTimeout(() => {
                    var randomXPosition = Math.floor(Math.random() * 3);
                    var randomYPosition = Math.floor(Math.random() * 3);
    
                    while(matriz[randomXPosition][randomYPosition].classList[1] ){
                        randomXPosition = Math.floor(Math.random() * 3);
                        randomYPosition = Math.floor(Math.random() * 3);
                    }
    
                    matriz[randomXPosition][randomYPosition].classList.add(type[count]);
                    count = (count + 1) % 2;
    
                    result = check();
                    printResult(result);
                }, 400);
            }
        }
    }


    function check() {

        var winner, empate = true;  

        for(y=0; y<2; y++){

            for(i=0; i<3; i++){
                
                if(matriz[i][0].classList[1] == type[y] && matriz[i][1].classList[1] == type[y] && matriz[i][2].classList[1] == type[y])
                    winner = matriz[i][0].classList[1];

                if(matriz[0][i].classList[1] == type[y] && matriz[1][i].classList[1] == type[y] && matriz[2][i].classList[1] == type[y])
                    winner = matriz[0][i].classList[1];
            }

            if(matriz[0][0].classList[1] == type[y] && matriz[1][1].classList[1] == type[y] && matriz[2][2].classList[1] == type[y])
                winner = matriz[0][0].classList[1];

            if(matriz[2][0].classList[1] == type[y] && matriz[1][1].classList[1] == type[y] && matriz[0][2].classList[1] == type[y])
                winner = matriz[2][0].classList[1];

        }

        if(!winner){
            for(i=0; i<3; i++){
                for(j=0; j<3; j++){
                    if(!matriz[i][j].classList[1]){
                        empate = false;
                    }
                }
            }
        }

        return [winner, empate];
    }

    function printResult(result) {

        if(result[0]){
                
            result[0] = result[0].split("-")[1];
            
            winnerContainer.style.display = 'block';
            winnerContainer.firstElementChild.innerHTML = "Jogador " + result[0] + " ganhou!";
            
            var winnerElement = document.querySelector("#"+result[0]);
            winnerPoints = parseInt(winnerElement.innerHTML.split(" ")[2]) + 1;
            winnerElement.innerHTML = result[0] +" : " + winnerPoints;

        }else if(result[1]) {

            winnerContainer.style.display = 'block';
            winnerContainer.firstElementChild.innerHTML = "Deu velha!";
        }
    }

    function restart() {

        items.forEach(item => item.classList.remove(item.classList[1]));
        winnerContainer.style.display = 'none';
        count = 0;
    }

    function reset() {

        var points = document.querySelectorAll(".points");
        points.forEach((element, idx) => element.innerHTML = idx ? "O : 0" : "X : 0");
        restart();
    }

})()