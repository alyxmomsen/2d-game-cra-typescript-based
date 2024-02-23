

export default function chanceGenerator (chance:number , accuracy:number ) {
    const percentsOfChance = chance < 0 ? 0 : chance > 100 ? 100 : chance ;
    const limitForPositiveChance = accuracy / 100 * percentsOfChance ;
    const number = Math.random() * accuracy ;
    if(number <= limitForPositiveChance) {
        return true ;
    }
    else {
        return false ;
    }
}