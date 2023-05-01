import { rankingFifa as allTeams, teamsByConfed } from "./fwcSpecifications.js";

function concacafClasification() {
  const hostsRequired = ["México", "Estados Unidos", "Canada"];
  const concacafTeams = allTeams.filter(team => team.confederation === "CONCACAF")
  let hosts = []
  let noHosts = []

  concacafTeams.map(team => {
    if(team.name === hostsRequired[0] ||
      team.name === hostsRequired[1] ||
      team.name === hostsRequired[2]) {
        hosts.push(team)
      } else {
        noHosts.push(team)
      }
  })
  
  const noHostsRequired = teamsByConfed.CONCACAF - hosts.length;
  const noHostsQualified = noHosts.slice(0, noHostsRequired);
  const concacafQualified = hosts.concat(noHostsQualified)

  console.log(concacafQualified);
  return concacafQualified;
}

concacafClasification();

export default concacafClasification;
