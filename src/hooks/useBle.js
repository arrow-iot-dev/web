import { useEffect, useState, useCallback } from 'react'

const serviceUUID = '52cf0b2c-28f2-4328-aaac-6badc36777d4'
const characteristicUUID = '051f540c-9a37-4284-9f98-2073e9f5bdfe'
const characteristicUUID2 = 'ec14304a-1796-4e20-b170-7f24492a5aca'
const bleName = 'Arrow_ESP32'

// const maxThreshold =  70 / 2.54 // 70 cm
// const minThreshold =  50 / 2.54 // 50 cm

// const cmToInch = (cm) => {
//   return cm / 2.54
// }

const useBle = () => {
  // const interval = useRef(null)
  // const [isScanning, setIsScanning] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [distance, setDistance] = useState(0)
  // const [maxDistance, setMaxDistance] = useState(0)
  const [time, setTime] = useState(0)
  // const [isReset, setIsReset] = useState(false)
  const [logs, setLogs] = useState([])
  // const [isStarting, setIsStarting] = useState(false)
  const [state, setState] = useState(0)
  const [alarmTime, setAlarmTime] = useState(0)

  useEffect(() => {
    const savedLogs = localStorage.getItem('logs')
    const oldLogs = savedLogs ? JSON.parse(savedLogs) : []
    setLogs(oldLogs)
  }, [])

  // const setToggleTimer = useCallback(() => {
  //   setIsStarting(starting => {
  //     if (starting) {
  //       setLogs((prevLogs) => {
  //         const newLogs = [...prevLogs, {
  //           distance: maxDistance,
  //           time,
  //         }]
  //         localStorage.setItem('logs', JSON.stringify(newLogs))
  //         return newLogs
  //       })
  //       setIsReset(false)
  //       setMaxDistance(0)
  //       setTime(0)
  //     } else {
  //       setIsReset(true)
  //     }
  //     return !starting
  //   })
  // }, [maxDistance, time])

  const clearLogs = useCallback(() => {
    setLogs([])
    localStorage.removeItem('logs')
  }, [])

  // const reset = useCallback(() => {
  //   setLogs((prevLogs) => {
  //     const newLogs = [...prevLogs, {
  //       distance: maxDistance,
  //       time,
  //     }]
  //     localStorage.setItem('logs', JSON.stringify(newLogs))
  //     return newLogs
  //   })
  //   setIsReset(false)
  //   setIsReset(true)
  //   setMaxDistance(0)
  //   setTime(0)
  // }, [time, maxDistance])

  const scanAndConnect = useCallback(() => {
    navigator.bluetooth.requestDevice({
      filters: [{
        name: bleName
      }],
      optionalServices: [serviceUUID]
    })
    .then(device => {
      console.log({ device })
      device.addEventListener('gattserverdisconnected', (event) => {
        const device = event.target;
        setIsConnected(false)
        console.log(`Device ${device.name} is disconnected.`)
      })
      return device.gatt.connect();
    })
    .then((server) => {
      console.log({ server })
      setIsConnected(server.connected)
      return server.getPrimaryService(serviceUUID)
    })
    .then((service) => {
      console.log({ service })
      return service.getCharacteristic(characteristicUUID)
    })
    .then((characteristic) => {
      console.log({ characteristic })
      return characteristic.startNotifications()
    })
    .then(characteristic => {
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = event.target.value
        const decoder = new TextDecoder('utf-8')
        /*
          state 0 = show distance only
          state 1 = show distance & time
          state 2 = show latest distance & time

          time => ms
          distance => inch
        */
        const [state, distance, time] = decoder.decode(value).split(',')
        const distanceInch = +distance
        const timeN = +time
        const stateN = +state
        setDistance(distanceInch)
        setTime(timeN)
        setState(stateN)
        if (stateN === 2) {
          setLogs((prevLogs) => {
            const newLogs = [...prevLogs, {
              distance: distanceInch,
              time: timeN,
            }]
            localStorage.setItem('logs', JSON.stringify(newLogs))
            return newLogs
          })
        }
        // if (isReset === 'true') {
        //   alert('reset')
        //   reset()
        // }
      });
      console.log('Notifications have been started.');
    })
    .catch(error => { console.error(error); });
  }, [])

  // useEffect(() => {
  //   if (isReset) {
  //     interval.current =  setInterval(() => {
  //       setTime(time => time + 1)
  //     }, 1000)
  //   }
  //   return () => clearInterval(interval.current)
  // }, [isReset])

  // useEffect(() => {
  //   setMaxDistance((prevMax) => {
  //     // if (distance >= minThreshold && distance <= maxThreshold) {
  //       if (distance > prevMax) {
  //         return distance
  //       }
  //     // }
  //     return prevMax
  //   })
  // }, [distance])

  const onSaveAlarmTime = () => {
    navigator.bluetooth.requestDevice({
      filters: [{
        name: bleName
      }],
      optionalServices: [serviceUUID]
    })
    .then(device => {
      console.log({ device })
      device.addEventListener('gattserverdisconnected', (event) => {
        const device = event.target;
        setIsConnected(false)
        console.log(`Device ${device.name} is disconnected.`)
      })
      return device.gatt.connect();
    })
    .then((server) => {
      console.log({ server })
      setIsConnected(server.connected)
      return server.getPrimaryService(serviceUUID)
    })
    .then((service) => {
      console.log({ service })
      return service.getCharacteristic(characteristicUUID2)
    })
    .then(characteristic => {
      if (alarmTime > 0) {
        const aTime = Uint8Array.of(alarmTime);
        characteristic.writeValue(aTime);
        alert('Saved !!!')
      } else {
        alert('Time is not valid !!!')
      }
    })
    .catch(error => { console.error(error); });
  }

  // return { distance, time, logs, isConnected, scanAndConnect, reset, clearLogs, setToggleTimer, isStarting, state }
  return { distance, time, logs, isConnected, scanAndConnect, clearLogs, state, alarmTime, setAlarmTime, onSaveAlarmTime }
}

export default useBle
