import { makeBombos } from "./fwcBombos";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

let fwcGroups = Array.from({ length: 8 }, () => []);
let bombos = makeBombos()

function makeGroups() {
  
  for (let i = 0; i < bombos.length; i++) {
    for (let j = 0; j < fwcGroups.length; j++) {
      let randomNum = getRandomInt(0, bombos[i].length)
      let [selectedTeam] = bombos[i].splice(randomNum, 1)
      fwcGroups[j].push(selectedTeam)
    }
  }
  return fwcGroups
}

// makeGroups()

export {makeGroups}