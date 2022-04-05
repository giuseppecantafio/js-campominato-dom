/* 
1) Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.

2) I numeri nella lista delle bombe non possono essere duplicati.

3) In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

4) La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.

5) Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba
*/

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
        // inserisco i numeri casuali nell'array delle bombe, livello facile
        while (bombe.length < BOMBE_ARRAY) {
            let numeroGenerato = getRandomInt(1, colNumberDifficile);
            if (!bombe.includes(numeroGenerato)) {
                bombe.push(numeroGenerato)
            }
        }
        // console.log(bombe);
    }

    function coloraSfondo() {
        const coloraCelle = document.querySelectorAll("div.grid-difficile, div.grid-medio, div.grid-facile");
        return coloraCelle;
    }
    let colora = coloraSfondo();
    // console.log(colora);

    for (let i = 0; i < colora.length; i++) {

        colora[i].addEventListener('click', function () {

            let cellNumber = parseInt(this.innerText);
            // coloro le celle in base alle bombe e agli spazi safe
            if (bombe.includes(cellNumber)){
                this.classList.add('sfondo-bomba');
                this.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
                 gameOver();
              } else {
                this.classList.add('sfondo');
              }
        })
    }

}

document.getElementById('bottone').addEventListener('click', generaCampoMinato);

