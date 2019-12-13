//represents 30-minute blocks after 9am 
let input = [
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 5 }, 
  { startTime: 4, endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9, endTime: 10 },
]

/*output: [
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 8 },
  { startTime: 9, endTime: 12 },
]
*/


function mergeRanges(input) {
  let sortedMeetings = input.slice().sort((a,b) => a.startTime - b.startTime); 
  let prev = input[0];
  let merged = [prev];
  for (let i = 1; i < input.length; i++) {
    let current = input[i];
    if (current.startTime <= prev.endTime) {
      prev.endTime = Math.max(prev.endTime, current.endTime); 
      prev.startTime = Math.min(prev.startTime, current.startTime);
    } else {
      merged.push(current); 
    }
    prev = current; 
  }
  return merged; 
}

console.log(mergeRanges(input)); 
