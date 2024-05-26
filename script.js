const wordContainer = document.getElementById('incognitas');
const startButton = document.getElementById('inicio');
const usedLettersElement = document.getElementById('historial_palabras');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const words = ['Carne','Martillo', 'Lavadora','Sucio','Cangrejo','Lento','Alimentos','Delgado','Cubo','Comida','Caracol','Abajo','Alumno','Bonito','Cesta','Sol','Beber','Botella','Hamburguesa','Invierno'];

