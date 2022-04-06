// costanti generali
const colNumberFacile = 100;
const colNumberMedio = 81;
const colNumberDifficile = 49;


// funzione per numeri casuali
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// constante per quante bombe servono in totale
const BOMBE_ARRAY = 16;
console.log('bombe array ' + BOMBE_ARRAY);

// creo array vuoto per bombe
const bombe = [];
console.log(bombe);

// creo variabile vuota per tentativi massimi utente - IL MASSIMO CHE POSSO FARE PER VINCERE è 100-16 o 81-16 o 49-16
let max_attempt;

// creo variabile per contare i tentativi massimi dell'utente
let attempts = 0;


function generaCampoMinato() {

    let livello = document.getElementById("sceltaLivello").value;
    console.log(livello);

    if (livello === 'facilissimo') {
        function stampareGrigliaFacile() {
            let grid = document.getElementById('grid');
            grid.classList.remove('text-wrapper');
            grid.classList.add('wrapper')
            let colsCreate = creaColonneFacile();
            // console.log(colsCreate);
            grid.innerHTML = colsCreate;

        }

        function creaColonneFacile() {
            let cols = '';
            for (let i = 1; i <= colNumberFacile; i++) {
                cols += `
                        <div class="grid-facile bordo"> ${i}</div>
                        `;
            }
            return cols;
        }
        stampareGrigliaFacile();

        // inserisco i numeri casuali nell'array delle bombe, livello facile
        while (bombe.length < BOMBE_ARRAY) {
            let numeroGenerato = getRandomInt(1, colNumberFacile);
            if (!bombe.includes(numeroGenerato)) {
                bombe.push(numeroGenerato)
            }
        }
        // console.log(bombe);

        //imposto max attempts per il livello facile
        max_attempt = 84;

    } else if (livello === 'medissimo') {
        function stampareGrigliaMedio() {
            let grid = document.getElementById('grid');
            grid.classList.remove('text-wrapper');
            grid.classList.add('wrapper');
            let colsCreate = creaColonneMedio();
            // console.log(colsCreate);
            grid.innerHTML = colsCreate;
        }

        function creaColonneMedio() {
            let cols = '';
            for (let i = 1; i <= colNumberMedio; i++) {
                cols += `
                        <div class="grid-medio bordo"> ${i}</div>
                        `;
            }
            return cols;
        }
        stampareGrigliaMedio();

        // inserisco i numeri casuali nell'array delle bombe, livello medio
        while (bombe.length < BOMBE_ARRAY) {
            let numeroGenerato = getRandomInt(1, colNumberMedio);
            if (!bombe.includes(numeroGenerato)) {
                bombe.push(numeroGenerato)
            }
        }
        // console.log(bombe);

        //imposto max attempts per il livello medio
        max_attempt = 65;

    } else {
        function stampareGrigliaDifficile() {
            let grid = document.getElementById('grid');
            grid.classList.remove('text-wrapper');
            grid.classList.add('wrapper')
            let colsCreate = creaColonneDifficile();
            // console.log(colsCreate);
            grid.innerHTML = colsCreate;
        }

        function creaColonneDifficile() {
            let cols = '';
            for (let i = 1; i <= colNumberDifficile; i++) {
                cols += `
                        <div class="grid-difficile bordo"> ${i}</div>
                        `;
            }
            return cols;
        }
        stampareGrigliaDifficile();

        // inserisco i numeri casuali nell'array delle bombe, livello difficile
        while (bombe.length < BOMBE_ARRAY) {
            let numeroGenerato = getRandomInt(1, colNumberDifficile);
            if (!bombe.includes(numeroGenerato)) {
                bombe.push(numeroGenerato)
            }
        }
        // console.log(bombe);

        //imposto max attempts per il livello medio
        max_attempt = 33;
    }

    let colora = document.querySelectorAll("div.grid-difficile, div.grid-medio, div.grid-facile");
    // console.log(colora);

     
    function coloraCelleCliccate(){

        let cellNumber = parseInt(this.innerText);
        // coloro le celle in base alle bombe e agli spazi safe
        if (bombe.includes(cellNumber)) {
            this.classList.add('sfondo-bomba');
            this.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
            gameOver();
        } else {
            this.classList.add('sfondo');
            attempts = attempts + 1;
        } if (attempts === max_attempt) {
            victory();
        }
    }

    for (let i = 0; i < colora.length; i++) {
        
        colora[i].addEventListener('click', coloraCelleCliccate);
    }

    function gameOver() {
        let grid = document.getElementById('grid');
        let loser = document.createElement('h1');
        loser.style.color = 'red';
        loser.innerHTML = `Game Over :( <br/> <h5>Numero di caselle cliccate: ${attempts}</h5>`;
        grid.append(loser);
        // BONUS impostare tutte le celle su no-drop appena finisce il gioco
        for (i = 0; i < colora.length; i++){
            colora[i].removeEventListener('click', coloraCelleCliccate); // NON FUNZIONA
            colora[i].style.cursor = 'no-drop'; // FUNZIONA
        }

    }
    function victory() {
        let grid = document.getElementById('grid');
        let winner = document.createElement('h1')
        winner.style.color = 'green';
        winner.innerHTML = `HAI VINTO!!!! <br/> <h5>Numero di caselle cliccate: ${attempts}</h5>`;
        grid.append(winner);
        // BONUS impostare tutte le celle su no-drop appena finisce il gioco
        for (i = 0; i < colora.length; i++){
            colora[i].removeEventListener('click', coloraCelleCliccate); // NON FUNZIONA
            colora[i].style.cursor = 'no-drop'; // FUNZIONA
        }
    }
}

document.getElementById('bottone').addEventListener('click', generaCampoMinato);

