import { makeBombos } from "./fwcBombos.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function checkGroupAvailability(team, group) {
  let uefaQty = 0;
  let otherConfedsInGroup = [];
  group.map((t) => {
    if (t.confederation === "UEFA") {
      uefaQty = uefaQty + 1;
    } else {
      otherConfedsInGroup.push(t.confederation);
    }
  });
  if (team.confederation === "UEFA") {
    if (uefaQty > 2) {
      return false;
    }
    return true;
  } else {
    if (otherConfedsInGroup.includes(team.confederation)) {
      return false;
    }
    return true;
  }
}

function checkAvailableGroups(team, bombo, group) {
  console.log("***inCheckAvailableGroups***");
  console.log("***fwcGroups[group + 1]***");
  console.log(fwcGroups[group + 1]);
  console.log("***rejected team***");
  console.log(team);

  let [extractedTeam] = fwcGroups[group + 1].splice(bombo, 1)
  console.log("***Extracted Team***")
  console.log(extractedTeam)
  fwcGroups[group + 1].push(team)
  fwcGroups[group].push(extractedTeam)
}

let fwcGroups = Array.from({ length: 8 }, () => []);
let bombos = makeBombos();

function makeGroups() {
  for (let i = 0; i < bombos.length; i++) {
    console.log("*******ANOTHER BOMBO********");
    for (let j = 0; j < fwcGroups.length; j++) {
      let randomNum = getRandomInt(0, bombos[i].length);
      let [selectedTeam] = bombos[i].splice(randomNum, 1);

      let isGroupAvailable = checkGroupAvailability(selectedTeam, fwcGroups[j]);

      console.log("***Group***");
      console.log(fwcGroups[j]);
      console.log("***SelectedTeam***");
      console.log(selectedTeam);
      console.log("***isGroupAvailable***");
      console.log(isGroupAvailable);

      if (isGroupAvailable) {
        fwcGroups[j].push(selectedTeam);
      } else {
        let availableGroups = checkAvailableGroups(selectedTeam, i, j);
      }
    }
  }
}

makeGroups();
// console.log("******FWC Groups*********")
// console.log(fwcGroups)
export { makeGroups };
