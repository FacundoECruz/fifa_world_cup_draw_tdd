import classification from "./classifications.js";
import concacafClassification from "./concacafClassification.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
} //TODO: TEST THIS!!!!!!!!

function sortQualifiedByRank(qualified) {
  const sortedQualified = qualified.sort(function (a, b) {
    return a.rank - b.rank;
  });

  return sortedQualified;
}

function allQualifiedTeams() {
  const uefa = classification("UEFA");
  const conmebol = classification("CONMEBOL");
  const concacaf = concacafClassification();
  const afc = classification("AFC");
  const caf = classification("CAF");

  let allQualified = uefa.concat(conmebol, concacaf, afc, caf);
  const qualifiedSortedByRank = sortQualifiedByRank(allQualified);
  return qualifiedSortedByRank;
}

let allQualified = allQualifiedTeams();
let bombos = []

function makeBombos() {
  while (allQualified.length) {
    let bombo = allQualified.splice(0, 8);
    bombos.push(bombo);
  }
  return bombos;
}

function makeGroups() {
  let fwcGroups = Array.from({ length: 8 }, () => []);

  for (let i = 0; i < bombos.length; i++) {
    for (let j = 0; j < fwcGroups.length; j++) {
      let randomNum = getRandomInt(0, bombos[i].length)
      let [selectedTeam] = bombos[i].splice(randomNum, 1)
      fwcGroups[j].push(selectedTeam)
    }
  }
  // console.log(fwcGroups)
  return fwcGroups
}

// makeGroups()

export { allQualifiedTeams, makeBombos, makeGroups };
