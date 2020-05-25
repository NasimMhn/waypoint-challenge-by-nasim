
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

const getSpeedingDuration = (speedLimit1: number, speedLimit2: number, speed1: number, speed2: number, t1: number, t2: number): number => {

  // if driver was speeding
  if (speed1 > speedLimit1 || speed2 > speedLimit2) {
    return t2 - t1
  }
  return 0
}
// convert timestamp to seconds
const getTime = (timestamp: string): number => {
  return new Date(timestamp).getTime() / 1000
}

const getInsuranceData = (waypoints: Waypoint[]): InsuranceData => {

  // To make sure waypoints are sorted on timestamp
  waypoints.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  let totalDistance: number = 0
  let totalDuration: number = 0
  let speedingDistance: number = 0
  let speedingDuration: number = 0

  for (let i = 1; i < waypoints.length; i++) {
    const wp1 = waypoints[i - 1]
    const wp2 = waypoints[i]

    const t1 = getTime(wp1.timestamp)
    const t2 = getTime(wp2.timestamp)

    const duration = t2 - t1
    const averageSpeed = (wp1.speed + wp2.speed) / 2
    const speedingTime = getSpeedingDuration(wp1.speed_limit, wp2.speed_limit, wp1.speed, wp2.speed, t1, t2) // not exact

    totalDistance += averageSpeed * duration // distance = speed * time
    totalDuration += duration
    speedingDistance += speedingTime * averageSpeed
    speedingDuration += speedingTime
  }
  return { totalDistance, totalDuration, speedingDistance, speedingDuration }
}

export default getInsuranceData