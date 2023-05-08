import { makeBombos } from "./fwcBombos.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

let fwcGroups = Array.from({ length: 8 }, () => []);
let bombos = makeBombos();

function areUefaExceeded(group){
  let rejectedTeams = []
  let uefaQty = 0
  group.map((team) => {
    if(team.confederation === "UEFA") {
      uefaQty = uefaQty + 1
    }
    if(uefaQty > 2 && team.confederation === "UEFA"){
      rejectedTeams.push(team)
    }
  })
  console.log(rejectedTeams)
  return rejectedTeams
}

function areOtherConfedsRepeated(group){

}

function makeGroups() {
  for (let i = 0; i < bombos.length; i++) {
    for (let j = 0; j < fwcGroups.length; j++) {
      let randomNum = getRandomInt(0, bombos[i].length);
      let [selectedTeam] = bombos[i].splice(randomNum, 1);
      fwcGroups[j].push(selectedTeam);
    }
  }

  for (let i = 0; i < fwcGroups.length; i++) {
    let uefaRepeated = areUefaExceeded(fwcGroups[i])
    let otherConfedRepeated = areOtherConfedsRepeated(fwcGroups[i])
  }
}

makeGroups();
// console.log(fwcGroups)
export { makeGroups };
