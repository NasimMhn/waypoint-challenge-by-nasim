import waypoints from './waypoints.json'
import { getPreciseDistance } from 'geolib';

const w1 = waypoints[0]
const w2 = waypoints[1]
console.log(waypoints)

// console.log(w1, w2)

const dist = getPreciseDistance(w1.position, w2.position)

const speed = (distance: number, time: number): number => {
  return distance / time
}

const timeDifference = []
const distanceDifference = []
for (let i = 0; i < waypoints.length - 1; i++) {
  const time1: any = new Date(waypoints[i].timestamp)
  const time2: any = new Date(waypoints[i + 1].timestamp)
  timeDifference.push(time2 - time1)
  distanceDifference.push(getPreciseDistance(waypoints[i + 1].position, waypoints[i].position))

}
console.log(timeDifference, distanceDifference)