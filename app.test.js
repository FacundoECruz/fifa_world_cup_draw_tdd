import concacafClasification from "./app";
import { teamsByConfed } from "./fwcSpecifications";

test("return the qualified teams by hosts", () => {
  
  expect(concacafClasification().length).toBe(teamsByConfed.CONCACAF);
});
