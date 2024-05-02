import React, { useState, useEffect } from "react";
import piper from "./img/pipe.png";
import mario from "./img/mario.gif"; 
import marioGameOver from "./img/game-over.png"; 
import pularimg from "./img/pular.svg";
import ceu from "./img/clouds.png";
import audio1 from "./img/Mario_Song.mp3";
import audioGameOver from "./img/Mario_game_over.mp3"; 
import "../src/styles/Games.css";

export function App() {
  const [pular, setPular] = useState(false);
  const [audio] = useState(new Audio(audio1));
  const [gameOver, setGameOver] = useState(false);
  const [pauseAnimations, setPauseAnimations] = useState(false); 

  audio.loop = true;
  audio.play();

  useEffect(() => {
    const handleKeyDown = () => {
      setPular(true);
      const timeout = setTimeout(() => {
        setPular(false);
      }, 1000);
      return () => clearTimeout(timeout);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      audio.pause();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      const marioElement = document.querySelector(".mario");
      const piperElement = document.querySelector(".piper");

      if (marioElement && piperElement) {
        const marioRect = marioElement.getBoundingClientRect();
        const piperRect = piperElement.getBoundingClientRect();

        if (
          marioRect.bottom >= piperRect.top &&
          marioRect.right >= piperRect.left &&
          marioRect.left <= piperRect.right
        ) {
          setGameOver(true);
          setPauseAnimations(true); 
        }
      } 
    };

    const interval = setInterval(checkCollision, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameOver) {
      audio.pause();
      const gameOverAudio = new Audio(audioGameOver);
      gameOverAudio.loop = false;
      gameOverAudio.play();
    }
  }, [gameOver]);

  const handleJumpClick = () => {
    setPular(true);
    const timeout = setTimeout(() => {
      setPular(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <>  
      <div className={`Game-board ${pauseAnimations ? 'pause-animations' : ''}`}>
        <img src={ceu} alt="nuvens" className="nuvens" />
        <img 
          src={gameOver ? marioGameOver : mario} 
          alt="mario" 
          className={`mario ${gameOver ? 'mario-game-over' : ''} ${pular ? 'pular' : ''}`} 
        />

        <img 
          src={piper} 
          alt="Piper" 
          className="piper" 
        />
        <img 
          src={pularimg} 
          className="pularimg" 
          alt="pular"
          onClick={handleJumpClick} 
        />  
      </div>
      {gameOver && <div className="game-over">Perdeu</div>}
      <ul>
      <li className="instrucoes">Clique qualquer tecla para pular</li>
      <li className="instrucoes">Apos perder faça um Recarregar</li>
      <li className="seta" >Clique na seta para pular</li>
      </ul>
    
    </>
  );
}

export default App;
