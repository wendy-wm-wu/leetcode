/*
// `totalSales` accepts one argument, an object containing an employee who manages
// a sales team, and returns the total sales for the entire team. Note: it is possible
// that any employee also manages a team.
//
// An employee looks like this:
//
// {
//   name: 'Fred Zirdung',
//   individualSales: 125,
//   leadsInProgress: 48,
//   manages: [/* ... */
// }
//
// EXAMPLE:
//
// var salesTeam = {
//   name: 'Arnaldo McDermott',
//   individualSales: 14,
//   leadsInProgress: 10,
//   manages: [
//     {
//       name: 'Lavina Romaguera',
//       individualSales: 15,
//       leadsInProgress: 22,
//       manages: [
//         {
//           name: 'Glen Hodkiewicz',
//           individualSales: 12,
//           leadsInProgress: 10,
//           manages: []
//         }
//       ]
//     },
//     {
//       name: 'Rey Hills',
//       individualSales: 19,
//       leadsInProgress: 5,
//       manages: []
//     }
//   ]
// };

// totalSales(salesTeam)

// returns 60


var totalSales = function (salesteam) {
  let sum = 0; 
  // sum += salesteam.individualSales; 
  for (let i = 0; i < salesteam.manages.length; i++) {
    let curr = salesteam.manages[i]; 
    if (typeof curr === "object") {
      sum += totalSales(curr); 
    } 
      sum += curr.individualSales;
  }
  return sum; 
}