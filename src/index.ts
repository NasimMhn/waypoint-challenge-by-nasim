import waypoints from './waypoints.json'

interface Waypoint {
  timestamp: string,
  position: {
    latitude: number,
    longitude: number,
  },
  speed: number,
  speed_limit: number
}

interface InsuranceData {
  totalDistance: number,
  totalDuration: number,
  speedingDistance: number,
  speedingDuration: number,
}

// To make sure waypoints are sorted on timestamp
waypoints.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());


const getInsuranceData = (waypoints: Waypoint[]): InsuranceData => {

  const distances: number[] = []
  const times: number[] = []

  waypoints.map((wp, index) => {
    if (index < waypoints.length - 1) {
      const time = ((new Date(waypoints[index + 1].timestamp).getTime() - new Date(wp.timestamp).getTime()) / 1000)
      const averageSpeed = (wp.speed + waypoints[index + 1].speed) / 2

      times.push(time)
      distances.push(averageSpeed * time) // distance = speed * time
    }
  })
  console.log("distances:", distances)
  console.log("times:", times)

  // Sum distances array
  const totalDistance: number = distances.reduce((x, y) => x + y)
  const totalDuration: number = times.reduce((x, y) => x + y)
  const speedingDistance: number = 0 // not ready
  const speedingDuration: number = 0 // not ready

  return { totalDistance, totalDuration, speedingDistance, speedingDuration }
}
console.log(getInsuranceData(waypoints))









// // Total duration
// const getTotalDuration = (firstTimestamp: string, lastTimestamp: string): number => {
//   const result = new Date(lastTimestamp).getTime() - new Date(firstTimestamp).getTime()
//   return result / 1000
// }
// // console.log("TotalDuration:", getTotalDuration(waypoints[0].timestamp, waypoints[waypoints.length - 1].timestamp))





