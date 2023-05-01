import classification from "./classifications.js";
import concacafClassification from "./concacafClassification.js";

const uefa = classification("UEFA")
const conmebol = classification("CONMEBOL")
const concacaf = concacafClassification()
const afc = classification("AFC")
const caf = classification("CAF")

let allQualified = uefa.concat(conmebol, concacaf, afc, caf)

console.log(allQualified.length)