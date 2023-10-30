class Field {
  constructor(field) {
    this._field = field;
  }

  print() {
    for (const element of this._field) {
      console.log(element.join(' ') + '\n');
    }
  }  
}

const myField = new Field([
    ['░', '░', 'O', '░'],
    ['*', 'O', '░', 'O'],
    ['░', '^', '░', '░'],
  ]);

const prompt = require('prompt-sync')({sigint: true});
// Initialize new game  
let gameActive = true;
// JavaScript RegExp to validate user input: (u)p, (d)own, (l)eft, (r)ight
const validMoves = ['u', 'd', 'l', 'r', 'q'];
// Initialize user input
let direction = null;
// Find initial position of player in field
let position = myField._field.findIndex(element => element.indexOf('*') > -1);
position = [position, myField._field[position].indexOf('*')];

while (gameActive) {
  
  switch (direction) {
    case 'u':
      position[0] = position[0] -1;
      break;
    case 'd':
      position[0] = position[0] + 1;
      break;
    case 'l':
      position[1] = position[1] - 1;
      break;
    case 'r':    
      position[1] = position[1] + 1;
      break;
    case 'q':    
      position[1] = position[1] + 1;
      console.log('Goodbye!');
      process.exit();
  }
 
  if (!(position[0] in myField._field) || !(position[1] in myField._field[0])) {
    console.log('Out of bounds. You lose!\n');
    process.exit();
  }   

  // Validate new position
  const newPosition = myField._field[position[0]][position[1]];

  switch (newPosition) {
    case '░':
      myField._field[position[0]][position[1]] = '*';
      break;
    case 'O':
      console.log('Sorry, you fell down a hole. You lose!\n');
      process.exit();
    case '^':
      console.log('You found your hat. Congrats!\n');
      process.exit();   
  }    

  // Clear screen
  console.clear();
  // display updated field
  myField.print();
  // Reset user input
  direction = null;
  // Keep prompting user for direction until a valid input is received
  while (!direction) {
    console.log('(u)p, (d)own, (l)eft, (r)ight, (q)uit')
    direction = prompt('Which way? ');
    // Validate the input
    direction = validMoves.find(element => element === direction.toLowerCase());
  }  
}