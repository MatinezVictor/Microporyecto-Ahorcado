const wordContainer = document.getElementById('incognitas');
const startButton = document.getElementById('inicio');
const usedLettersElement = document.getElementById('historial_palabras');
const wordReveal = document.getElementById('palabra_escogida');
const remainingTries = document.getElementById('intentos_restantes');
const txtWins = document.getElementById('victorias');
const txtLoses = document.getElementById('derrotas');
const gameDesc1 = document.getElementById('desc1');
const gameDesc2 = document.getElementById('desc2');


let tries = 6;
let wins = 0;
let loses = 0;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const words = ['Carne','Martillo','Lavadora',
                'Sucio','Cangrejo','Lento',
                'Alimentos','Delgado','Cubo',
                'Comida','Caracol','Abajo',
                'Alumno','Bonito','Cesta',
                'Sol','Beber','Botella',
                'Hamburguesa','Invierno','Playa',
                'Arco','Posada','Hotel',
                'Televisor','Manzana','Pizza'];

const bodyParts = [
    [6,2,3,3],
    [7,3,1,6],
    [4,6,3,1],
    [8,6,3,1],
    [8,9,1,3],
    [6,9,1,3]
];

let palabraSeleccionada;
let letrasUsadas;
let mistakes;
let hits;

const añadirLetra = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const añadirParteCuerpo = bodyPart => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(...bodyPart);
};

const letraEquivocada = () => {
    tries--;
    remainingTries.innerHTML = `Intentos restantes: ${tries}`;
    añadirParteCuerpo(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame('lose');
}

const endGame = (condition) => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    remainingTries.innerHTML = '';
    if(condition === 'win') {
        wordReveal.innerHTML = '¡Has adivinado la palabra!';
        wins++;
    }
    else {
        wordReveal.innerHTML = `La palabra era: ${palabraSeleccionada.join().replaceAll(',', '')}`;
        loses++;
    }
}

const letraCorrecta = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === palabraSeleccionada.length) endGame('win');
}

const letraInput = letter => {
    if(palabraSeleccionada.includes(letter)) {
        letraCorrecta(letter);
    } else {
        letraEquivocada();
    }
    añadirLetra(letter);
    letrasUsadas.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !letrasUsadas.includes(newLetter)) {
        letraInput(newLetter);
    };
};

const dibujarLetra = () => {
    palabraSeleccionada.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const seleccionRandom = () => {
    let palabra = words[Math.floor((Math.random() * words.length))].toUpperCase();
    palabraSeleccionada = palabra.split('');
};

const dibujarHombre = () => {
    ctx.canvas.width  = 200;
    ctx.canvas.height = 200;
    ctx.scale(15, 15);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 12, 4, 1);
    ctx.fillRect(1, 0, 1, 12);
    ctx.fillRect(2, 0, 7, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(7, 1, 1, 1);
};

const startGame = () => {
    tries = 6;
    letrasUsadas = [];
    mistakes = 0;
    hits = 0;
    gameDesc1.remove();
    gameDesc2.remove();
    txtWins.innerHTML = `Wins: ${wins}`;
    txtLoses.innerHTML = `Loses: ${loses}`;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    wordReveal.innerHTML = '';
    remainingTries.innerHTML = `Intentos restantes: ${tries}`;
    dibujarHombre();
    seleccionRandom();
    dibujarLetra();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);