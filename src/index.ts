import waypoints from './waypoints.json'
import { getPreciseDistance } from 'geolib' // library to calculate distans


// To make sure waypoints are sorted on timestamp
waypoints.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

/* Functions */

// Total duration
const TotalDuration = (firstTimestamp: string, lastTimestamp: string): number => {
  const result = new Date(lastTimestamp).getTime() - new Date(firstTimestamp).getTime()
  return result / 1000
}
TotalDuration(waypoints[0].timestamp, waypoints[waypoints.length - 1].timestamp)

// Total distance

// Duration speeding

// Distance speeding




const dist = getPreciseDistance(waypoints[1].position, waypoints[2].position)
console.log(dist)

// const speed = (distance: number, time: number): number => {
//   return distance / time
// }

// const timeDifference = []
// const distanceDifference = []
// for (let i = 0; i < waypoints.length - 1; i++) {
//   const time1: any = new Date(waypoints[i].timestamp)
//   const time2: any = new Date(waypoints[i + 1].timestamp)
//   timeDifference.push(time2 - time1)
//   distanceDifference.push(getPreciseDistance(waypoints[i + 1].position, waypoints[i].position))

// }
// console.log(timeDifference, distanceDifference)


