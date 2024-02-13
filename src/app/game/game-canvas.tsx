import React, { useEffect, useRef } from 'react';
import { Game } from '../../entities/game/game';

const GameCanvas: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      
        const ctx = canvas.getContext('2d');

        if(ctx) {

            const game = new Game(ctx , {vw:canvas.width , vh:canvas.height} );

            const routine = () => {
              
              game.update() ;
              game.render() ;

              window.requestAnimationFrame(routine);
            }

            window.requestAnimationFrame(routine);


        }

    }
  }, []);

  return <canvas ref={canvasRef} width={800 * 1.2} height={600 * 1.2} />;
};

export default GameCanvas;