let words: string[] = [
    'COMPUTADORA',
    'CELULAR',
    'TELEFONO',
    'TELEVISOR',
    'CASA',
    'MESA ',
    'TABLA ',
    'MATA',
];

export function getRandomWord(){
    let randomIndex =(Math.floor( Math.random() * words.length));
    
    return words[randomIndex];

}