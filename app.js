import { rankingFifa as teams, teamsByConfed } from "./fwcSpecifications.js";

function concacafClasification() {
  let concacafQualified = [];
  teams.map((t) => {
    if (
      t.confederation === "CONCACAF" &&
      concacafQualified.length < teamsByConfed.CONCACAF
    ) {
      concacafQualified.push(t);
    } else {
      return;
    }
  });
  return concacafQualified
}

concacafClasification();

export default concacafClasification;
