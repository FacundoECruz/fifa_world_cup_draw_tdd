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

const fwcGroupsQty = 8;

function setGroupsHead() {
  const allQualified = allQualifiedTeams();
  let fwcGroups = [];
  const groupsHead = allQualified.splice(0, fwcGroupsQty);

  for (let i = 0; i < fwcGroupsQty; i++) {
    let randomNum = getRandomInt(0, groupsHead.length);
    let team = groupsHead.splice(randomNum, 1);
    if (team.length === 0) {
      return i--;
    } else {
      fwcGroups.push(team);
    }
  }
  console.log(fwcGroups);
  return fwcGroups
}

setGroupsHead();

export { setGroupsHead, allQualifiedTeams };
