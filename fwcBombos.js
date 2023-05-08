import classification from "./classifications.js";
import concacafClassification from "./concacafClassification.js";

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

function makeBombos() {
  let allQualified = allQualifiedTeams();
  let bombos = []
  while (allQualified.length) {
    let bombo = allQualified.splice(0, 8);
    bombos.push(bombo);
  }
  return bombos;
}

// let bombos = makeBombos()
// console.log(bombos)

export { allQualifiedTeams, makeBombos };
