import { rankingFifa as allTeams, teamsByConfed } from "./fwcSpecifications.js";

function classification(confederation) {
  const qualified = []

  allTeams.map((team) => {
    if(team.confederation === confederation && qualified.length < teamsByConfed[confederation]){
      qualified.push(team)
    } else {
      return
    }
  })
  console.log(qualified.length)
  return qualified
}

classification("UEFA")

export default classification;