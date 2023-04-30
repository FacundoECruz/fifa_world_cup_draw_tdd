import concacafClasification from "./app";
import { teamsByConfed } from "./fwcSpecifications";

describe("CONCACAF classification", () => {

  // beforeAll()

  test("return the correct quantity of concacaf qualified teams", () => {
    const concacafAllQualified = concacafClasification()
    expect(concacafAllQualified.length).toBe(teamsByConfed.CONCACAF);
  });
  
  test("check that all qualified are from concacaf", () => {
    const concacafAllQualified = concacafClasification()
    const returnedQualifiedConfeds = []
    concacafAllQualified.map(t => {
      returnedQualifiedConfeds.push(t.confederation)
    })
    const areAllFromConcacaf = returnedQualifiedConfeds.every(c => c === "CONCACAF")
    expect(areAllFromConcacaf).toBe(true)
  })

  test.todo("returned array should contains the hosts teams")
})

