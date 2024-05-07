import { useEffect, useState } from 'react';
import './App.css';
import { HangImage } from './components/HangImage.tsx';
import { letters } from './helpers/letters.ts';
import { getRandomWord } from './helpers/getRandomWord.ts';

function App() {

  const [ word, setWord ] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length) );
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  useEffect( ()=>{
    if(attempts>=9){
      setLose(true);
    }
  }, [attempts]);

  useEffect(()=> {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    console.log(currentHiddenWord);
    if( currentHiddenWord === word){
      setWon(true);

    }

  }, [hiddenWord])


  const checkLetter = (letter) =>{

    if(lose) return;
    if(won) return;

    if(!word.includes(letter)){
      // console.log(letter +' no existe');
      setAttempts(  Math.min (attempts +1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ')
    console.log(hiddenWordArray);

    for(let i=0; i<word.length;i++){
      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
      // console.log(word[i]);
    }

    setHiddenWord(hiddenWordArray.join(' '));
    
  }

  const newGame = ()=>{
    // console.log('new');
    const newWord = getRandomWord();

    setWord( newWord);
    setHiddenWord( '_ '.repeat(newWord.length) );
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return(
    <div className="App">

      <HangImage imageNumber={attempts}/>
      <h3>{hiddenWord}</h3>

      <h3>intentos: {attempts}</h3>

      {
        (lose)? <h2>perdio la palabra es {word}</h2>:''
      }

      {
        (won)? <h2>gano</h2>:''
      }

      {
        letters.map( (letter) => (
          <button 
          onClick={ () =>checkLetter(letter)}
          key={letter}>
            {letter}
          </button>
        ))
      }

      <br ></br>
      <br ></br>
      <br ></br>
      <button onClick={ newGame}>Nuevo juego</button>      
    </div>
  )
}

export default App;
