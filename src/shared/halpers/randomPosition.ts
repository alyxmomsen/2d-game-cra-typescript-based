
export function randomPosition ({posX , posY}:{posX:{min:number , max:number} , posY:{min:number , max:number}}) {

    const x = Math.floor(Math.random() * (posX.max - posX.min)) + posX.min ;
    const y = Math.floor(Math.random() * (posY.max - posY.min)) + posY.min ;

    return {x , y} ;

}