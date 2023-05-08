import concacafClassification from "./concacafClassification";
import classification from "./classifications";
import { teamsByConfed } from "./fwcSpecifications";
import { allQualifiedTeams, makeBombos } from "./fwcBombos";
import { makeGroups } from "./fwcDraw";

function checkSameConfederation(qualified, confederation) {
  let returnedQualifiedConfeds = [];
  qualified.map((team) => {
    returnedQualifiedConfeds.push(team.confederation);
  });
  const areAllFromGivenConfed = returnedQualifiedConfeds.every(
    (confed) => confed === confederation
  );
  return areAllFromGivenConfed;
}

let allQualified = allQualifiedTeams();
let bombos = makeBombos();
let groups = makeGroups();

describe("CONCACAF classification", () => {
  test("return the correct quantity of concacaf qualified teams", () => {
    const concacafAllQualified = concacafClassification();
    expect(concacafAllQualified.length).toBe(teamsByConfed.CONCACAF);
  });

  test("check that all qualified are from concacaf", () => {
    const concacafAllQualified = concacafClassification();
    const areAllFromConcacaf = checkSameConfederation(
      concacafAllQualified,
      "CONCACAF"
    );
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
    const conmebolQualified = classification("CONMEBOL");
    const uefaQualified = classification("UEFA");
    const afcQualified = classification("AFC");
    const cafQualified = classification("CAF");
    expect(conmebolQualified.length).toBe(teamsByConfed.CONMEBOL);
    expect(uefaQualified.length).toBe(teamsByConfed.UEFA);
    expect(afcQualified.length).toBe(teamsByConfed.AFC);
    expect(cafQualified.length).toBe(teamsByConfed.CAF);
  });

  test("check that all qualified are from the given confederation", () => {
    const conmebolQualified = classification("CONMEBOL");
    const uefaQualified = classification("UEFA");
    const afcQualified = classification("AFC");
    const cafQualified = classification("CAF");
    const areAllFromConmebol = checkSameConfederation(
      conmebolQualified,
      "CONMEBOL"
    );
    const areAllFromUefa = checkSameConfederation(uefaQualified, "UEFA");
    const areAllFromAfc = checkSameConfederation(afcQualified, "AFC");
    const areAllFromCaf = checkSameConfederation(cafQualified, "CAF");
    expect(areAllFromConmebol).toBe(true);
    expect(areAllFromUefa).toBe(true);
    expect(areAllFromAfc).toBe(true);
    expect(areAllFromCaf).toBe(true);
  });
});

describe("fifa world cup bombos", () => {
  test("returns an array of 32 qualified teams sorted by rank", () => {
    for (let i = 0; i < allQualified.length - 1; i++) {
      let j = i + 1;
      let team1Rank = allQualified[i].rank;
      let team2Rank = allQualified[j].rank;
      let isSorted = team1Rank < team2Rank;
      expect(isSorted).toBe(true);
    }
  });

  test("returns an array with 4 bombos, 8 teams per bombo, pulling away teams by rank", () => {
    // let bombos = makeBombos();
    expect(bombos.length).toBe(4);
    let lastTeamInBomboRank = 0;
    let firstTeamInBomboRank = 0;

    for (let i = 0; i < bombos.length; i++) {
      let bombo = bombos[i];
      expect(bombo.length).toBe(8);
      firstTeamInBomboRank = bombo[0].rank;
      if (i !== 0) {
        let isSorted = firstTeamInBomboRank > lastTeamInBomboRank;
        expect(isSorted).toBe(true);
      }
      lastTeamInBomboRank = bombo[7].rank;
    }
  });
});

describe("fifa world cup draw", () => {
  test("returns an array with 8 groups and 4 teams per group", () => {
    expect(groups.length).toBe(8);
    for (let i = 0; i < groups.length; i++) {
      expect(groups[i].length).toBe(4);
    }
  });

  test("groups must contain one team from each bombo", () => {
    let bombosRange = [];

    bombos.map((bombo) => {
      let firstTeamInBomboRank = bombo[0].rank;
      let lastTeamInBomboRank = bombo[7].rank;
      let bomboRange = [firstTeamInBomboRank, lastTeamInBomboRank];
      bombosRange.push(bomboRange);
    });

    groups.map((group) => {
      for (let i = 0; i < group.length; i++) {
        let teamRank = group[i].rank;
        let bomboRangeForTeam = bombosRange[i];
        let isFromGivenBombo =
          teamRank >= bomboRangeForTeam[0] && teamRank <= bomboRangeForTeam[1];
        expect(isFromGivenBombo).toBe(true);
      }
    });
  });

  test(
    "each group must not contain teams from the same confederation (excepting UEFA)", () => {
      groups.map((group) => {
        let groupConfeds = []
        group.map((team) => {
          if(team.confederation !== "UEFA") {
            groupConfeds.push(team.confederation)
          }
        })
        let repeatedConfeds = groupConfeds.filter((value, index, array) => array.indexOf(value) !== index)
        let isRepeated = repeatedConfeds.length > 0
        console.log(group)
        expect(isRepeated).toBe(false)
      })
    }
  );


  test.todo("groups must not contain more than two UEFA teams");

});
