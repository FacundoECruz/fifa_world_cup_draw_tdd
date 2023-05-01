import concacafClasification from "./app";
import { teamsByConfed } from "./fwcSpecifications";

describe("CONCACAF classification", () => {
    test("return the correct quantity of concacaf qualified teams", () => {
    const concacafAllQualified = concacafClasification();
    expect(concacafAllQualified.length).toBe(teamsByConfed.CONCACAF);
  });

  test("check that all qualified are from concacaf", () => {
    const concacafAllQualified = concacafClasification();
    const returnedQualifiedConfeds = [];
    concacafAllQualified.map((team) => {
      returnedQualifiedConfeds.push(team.confederation);
    });
    const areAllFromConcacaf = returnedQualifiedConfeds.every(
      (confed) => confed === "CONCACAF"
    );
    expect(areAllFromConcacaf).toBe(true);
  });

  test("returned array should contains the hosts teams", () => {
    const concacafAllQualified = concacafClasification();
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
