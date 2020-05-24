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


const getSpeedingDuration = (speedLimit1: number, speedLimit2: number, speed1: number, speed2: number, t1: number, t2: number): number => {

  // if driver was speeding
  if (speed1 > speedLimit1 || speed2 > speedLimit2) {
    return t2 - t1
  }
  return 0
}

export const getInsuranceData = (waypoints: Waypoint[]): InsuranceData => {

  let totalDistance: number = 0
  let totalDuration: number = 0
  let speedingDistance: number = 0
  let speedingDuration: number = 0

  for (let i = 1; i < waypoints.length; i++) {
    const wp1 = waypoints[i - 1]
    const wp2 = waypoints[i]

    const t1 = new Date(wp1.timestamp).getTime() / 1000 // in seconds
    const t2 = new Date(wp2.timestamp).getTime() / 1000 // in seconds

    const tDifference = t2 - t1
    const averageSpeed = (wp1.speed + wp2.speed) / 2
    const speedingTime = getSpeedingDuration(wp1.speed_limit, wp2.speed_limit, wp1.speed, wp2.speed, t1, t2) // not exact

    totalDistance += averageSpeed * tDifference // distance = speed * time
    totalDuration += tDifference
    speedingDistance += speedingTime * averageSpeed
    speedingDuration += speedingTime
  }
  return { totalDistance, totalDuration, speedingDistance, speedingDuration }
}

console.log(getInsuranceData(waypoints))

