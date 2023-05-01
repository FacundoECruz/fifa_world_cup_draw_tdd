import concacafClassification from "./concacafClassification";
import classification from "./classifications";
import { teamsByConfed } from "./fwcSpecifications";

function checkSameConfederation(qualified, confederation){
  let returnedQualifiedConfeds = []
  qualified.map((team) => {
    returnedQualifiedConfeds.push(team.confederation)
  })
  const areAllFromGivenConfed = returnedQualifiedConfeds.every((confed) => confed === confederation)
  return areAllFromGivenConfed;
}

describe("CONCACAF classification", () => {
  test("return the correct quantity of concacaf qualified teams", () => {
    const concacafAllQualified = concacafClassification();
    expect(concacafAllQualified.length).toBe(teamsByConfed.CONCACAF);
  });

  test("check that all qualified are from concacaf", () => {
    const concacafAllQualified = concacafClassification();
    const areAllFromConcacaf = checkSameConfederation(concacafAllQualified, "CONCACAF")
    expect(areAllFromConcacaf).toBe(true);
  });

  test("returned array should contains the hosts teams", () => {
    const concacafAllQualified = concacafClassification();
    let namesOfTeams = [];
    concacafAllQualified.map((team) => {
      namesOfTeams.push(team.name);
    });
    let containsAllHosts = () => {
      if (
        namesOfTeams.includes("Canada") &&
        namesOfTeams.includes("México") &&
        namesOfTeams.includes("Estados Unidos")
      ) {
        return true;
      } else {
        return false;
      }
    };
    expect(containsAllHosts()).toBe(true);
  });
});

describe("Other confederations classification", () => {
  test("should return the correct quantity of qualified teams by confederation", () => {
    const conmebolQualified = classification("CONMEBOL")
    const uefaQualified = classification("UEFA")
    const afcQualified = classification("AFC")
    const cafQualified = classification("CAF")
    expect(conmebolQualified.length).toBe(teamsByConfed.CONMEBOL)
    expect(uefaQualified.length).toBe(teamsByConfed.UEFA)
    expect(afcQualified.length).toBe(teamsByConfed.AFC)
    expect(cafQualified.length).toBe(teamsByConfed.CAF)
  });

  test("check that all qualified are from the given confederation", () => {
    const conmebolQualified = classification("CONMEBOL")
    const uefaQualified = classification("UEFA")
    const afcQualified = classification("AFC")
    const cafQualified = classification("CAF")
    const areAllFromConmebol = checkSameConfederation(conmebolQualified, "CONMEBOL")
    const areAllFromUefa = checkSameConfederation(uefaQualified, "UEFA")
    const areAllFromAfc = checkSameConfederation(afcQualified, "AFC")
    const areAllFromCaf = checkSameConfederation(cafQualified, "CAF")
    expect(areAllFromConmebol).toBe(true)
    expect(areAllFromUefa).toBe(true)
    expect(areAllFromAfc).toBe(true)
    expect(areAllFromCaf).toBe(true)
  })
});

describe("draw fifa world cup groups", () => {
  test.todo("should return an array for each group")
})
