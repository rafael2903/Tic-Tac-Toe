(function(){

    var type = ["show-X","show-O"];
    count = 0;

    var items = document.querySelectorAll(".grid-item");
    items.forEach(item => item.addEventListener("click",print));
    

    function print(e) {

        if(e.target.classList.length == 1) {
            e.target.classList.add(type[count]);
            count = (count + 1) % 2;
            check();
        }
    }

    function check() {
        
        var matriz = [[items[0],items[1],items[2]],
                      [items[3],items[4],items[5]],
                      [items[6],items[7],items[8]]];

        var winner;


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

            // if(!winner){
            //     for(i=0;i<3;i++){
            //         for(j=0;j<3;j++){
            //             if(matriz[i][j].classList[1]){
            //                 teste=2;
            //             }
            //         }
            //     }
            // }
        console.log(winner);
}

})()