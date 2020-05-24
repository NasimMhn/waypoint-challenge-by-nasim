import waypoints from '../waypoints.json'

import { getInsuranceData } from '../getInsuranceData'

test('test_file', () => {
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
  const testWaypoints = [
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
  expect(getInsuranceData(testWaypoints)).toMatchObject(correctAnswer);
})

test('speeding', () => {
  const testWaypoints = [
    {
      "timestamp": "2016-06-21T12:00:20.000Z",
      "position": {
        "latitude": 59.334,
        "longitude": 18.0667
      },
      "speed": 21,
      "speed_limit": 20
    },
    {
      "timestamp": "2016-06-21T12:01:00.000Z",
      "position": {
        "latitude": 59.3337,
        "longitude": 18.0662
      },
      "speed": 21,
      "speed_limit": 20
    }
  ]
  const correctAnswer = {
    "totalDistance": 840,
    "totalDuration": 40,
    "speedingDistance": 840,
    "speedingDuration": 40
  }
  expect(getInsuranceData(testWaypoints)).toMatchObject(correctAnswer);
})


test('partially_speeding', () => {
  const testWaypoints = [
    {
      "timestamp": "2016-06-21T12:00:10.000Z",
      "position": {
        "latitude": 59.334,
        "longitude": 18.0667
      },
      "speed": 10,
      "speed_limit": 20
    },
    {
      "timestamp": "2016-06-21T12:00:20.000Z",
      "position": {
        "latitude": 59.3337,
        "longitude": 18.0662
      },
      "speed": 10,
      "speed_limit": 20
    },
    {
      "timestamp": "2016-06-21T12:00:30.000Z",
      "position": {
        "latitude": 59.3337,
        "longitude": 18.0662
      },
      "speed": 10,
      "speed_limit": 20
    },
    {
      "timestamp": "2016-06-21T12:00:40.000Z",
      "position": {
        "latitude": 59.3337,
        "longitude": 18.0662
      },
      "speed": 30,
      "speed_limit": 20
    }
  ]
  const correctAnswer = {
    "totalDistance": 400,
    "totalDuration": 30,
    "speedingDistance": 200,
    "speedingDuration": 10
  }
  expect(getInsuranceData(testWaypoints)).toMatchObject(correctAnswer);
})