import waypoints from '../waypoints.json'

import { getInsuranceData } from '../index'

test('waypoints', () => {
  const testWaypoint = waypoints
  const correctAnswer = {
    "totalDistance": 180.89725,
    "totalDuration": 20,
    "speedingDistance": 139.27225,
    "speedingDuration": 15
  }
  expect(getInsuranceData(testWaypoint)).toMatchObject(correctAnswer);
})


test('no_speeding', () => {
  const waypoints = [
    {
      "timestamp": "2016-06-21T12:00:00.000Z",
      "position": {
        "latitude": 59.334,
        "longitude": 18.0667
      },
      "speed": 5,
      "speed_limit": 20
    },
    {
      "timestamp": "2016-06-21T12:00:05.000Z",
      "position": {
        "latitude": 59.3337,
        "longitude": 18.0662
      },
      "speed": 15,
      "speed_limit": 20
    }
  ]
  const correctAnswer = {
    "totalDistance": 50,
    "totalDuration": 5,
    "speedingDistance": 0,
    "speedingDuration": 0
  }
  expect(getInsuranceData(testWaypoint)).toMatchObject(correctAnswer);
})
