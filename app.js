import { rankingFifa as teams, teamsByConfed } from "./fwcSpecifications.js";

function concacafClasification() {
  let concacafQualified = Array.from(
    { length: teamsByConfed.CONCACAF },
    () => []
  );
  return concacafQualified;
}

concacafClasification();

export default concacafClasification;
