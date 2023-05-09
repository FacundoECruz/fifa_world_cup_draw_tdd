import { makeBombos } from "./fwcBombos.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function areUefaExceeded(group) {
  let rejectedTeams = [];
  let uefaQty = 0;
  group.map((team) => {
    if (team.confederation === "UEFA") {
      uefaQty = uefaQty + 1;
    }
    if (uefaQty > 2 && team.confederation === "UEFA") {
      rejectedTeams.push(team);
    }
  });
  return rejectedTeams;
}

function areOtherConfedsRepeated(group) {
  let rejectedTeams = [];
  let confedsInGroup = [];
  group.map((team) => {
    if (team.confederation !== "UEFA") {
      let repeatedConfed = confedsInGroup.includes(team.confederation);
      if (repeatedConfed) {
        rejectedTeams.push(team);
      }
      confedsInGroup.push(team.confederation);
    }
  });
  return rejectedTeams;
}

let fwcGroups = Array.from({ length: 8 }, () => []);
let bombos = makeBombos();

function makeGroups() {
  for (let i = 0; i < bombos.length; i++) {
    for (let j = 0; j < fwcGroups.length; j++) {
      let randomNum = getRandomInt(0, bombos[i].length);
      let [selectedTeam] = bombos[i].splice(randomNum, 1);
      fwcGroups[j].push(selectedTeam);
    }
  }

  let rejectedTeams = [];

  for (let i = 0; i < fwcGroups.length; i++) {
    let uefaRepeated = areUefaExceeded(fwcGroups[i]);
    let otherConfedRepeated = areOtherConfedsRepeated(fwcGroups[i]);
    if (uefaRepeated.length) {
      uefaRepeated.map((team) => {
        rejectedTeams.push(team);
        let groupRejected = fwcGroups[i].splice(fwcGroups[i].indexOf(team), 1);
      });
    }
    if (otherConfedRepeated.length) {
      otherConfedRepeated.map((team) => {
        rejectedTeams.push(team);
        let groupRejected = fwcGroups[i].splice(fwcGroups[i].indexOf(team), 1);
      });
    }
  }
  // console.log("*****************");
  // console.log("Last Rejected Team");
  // console.log(rejectedTeams[rejectedTeams.length - 1]);

  while (rejectedTeams.length) {
    for (let j = 0; j < fwcGroups.length; j++) {
      if (fwcGroups[j].length < 4) {
        let confedsInGroup = [];
        fwcGroups[j].map((team) => {
          confedsInGroup.push(team.confederation);
        });
        console.log("*****Confeds In Group******")
        console.log(confedsInGroup)
        if (!confedsInGroup.includes(rejectedTeams[rejectedTeams.length - 1].confederation)) {
          let [selectedTeam] = rejectedTeams.splice(rejectedTeams.length - 1, 1);
          console.log("******Selected Team*******")
          console.log(selectedTeam)
          fwcGroups[j].push(selectedTeam);
        }
      }
    }
  }
}

makeGroups();
// console.log("******FWC Groups*********")
// console.log(fwcGroups)
export { makeGroups };
