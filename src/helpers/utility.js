export function getCop(id) {
  if (id == 1) {
    return {
      name: "James Bond",
      rank: "Detective"
    }
  } else if (id == 2) {
    return {
      name: "Anushree",
      rank: "Police Captain"
    }
  } else if (id == 3) {
    return {
      name: "John Wick",
      rank: "Constable"
    }
  } else {
    return {
      name: "Unknow",
      rank: "Unknown"
    }
  }
}