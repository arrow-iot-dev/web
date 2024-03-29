import { useEffect, useState, useCallback, useRef } from 'react'

const serviceUUID = '52cf0b2c-28f2-4328-aaac-6badc36777d4'
const characteristicUUID = '051f540c-9a37-4284-9f98-2073e9f5bdfe'
// const characteristicUUID2 = 'ec14304a-1796-4e20-b170-7f24492a5aca'
const bleName = 'Arrow_ESP32'

// const maxThreshold =  70 / 2.54 // 70 cm
// const minThreshold =  50 / 2.54 // 50 cm

// const cmToInch = (cm) => {
//   return cm / 2.54
// }

// const mockLogs = [{
//   distance: 100.0,
//   time: 4000,
//   dateTime: new Date(),
//   name: 'Ping',
//   point: '0',
//   uuid: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)),
// }, {
//   distance: 100.0,
//   time: 4000,
//   dateTime: new Date(),
//   name: 'Joe',
//   point: '10',
//   uuid: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)),
// }, {
//   distance: 120.0,
//   time: 4100,
//   dateTime: new Date(),
//   name: 'Jame',
//   point: 'x',
//   uuid: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)),
// }]

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
  const [alarmTimeMax, setAlarmTimeMax] = useState(0)
  const [alarmTimeMin, setAlarmTimeMin] = useState(0)
  const [names, setNames] = useState([])
  const [selectedName, _setSelectedName] = useState()
  //const [bleDevice, setBleDevice] = useState(null)
  const [bleCharacteristic, setBleCharacteristic] = useState(null)
  //const [bleAbortControllerCharacteristic, setBleAbortControllerCharacteristic] = useState(null)

  const selectedNameRef = useRef(selectedName)
  const setSelectedName = ((data) => {
    selectedNameRef.current = data
    _setSelectedName(data)
  })

  useEffect(() => {
    const savedLogs = localStorage.getItem('logs')
    const oldLogs = savedLogs ? JSON.parse(savedLogs) : []
    setLogs(oldLogs)
    // setLogs(mockLogs)

    const savedNames = localStorage.getItem('names')
    const oldNames = savedNames ? JSON.parse(savedNames) : ['Default']
    setNames(oldNames)
    setSelectedName(oldNames?.[0])
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
    if (!isConnected) {
      navigator.bluetooth.requestDevice({
        filters: [{
          name: bleName
        }],
        optionalServices: [serviceUUID]
      })
      .then(device => {
        console.log({ device })
        //setBleDevice(device)
        device.addEventListener('gattserverdisconnected', (event) => {
          const device = event.target;
          setIsConnected(false)
          setBleCharacteristic(null)
          alert('Device disconnected.')
          console.log(`Device ${device.name} is disconnected.`)
        }, {once: true})
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
        setBleCharacteristic(characteristic)
        return characteristic.startNotifications()
      })
      .then(characteristic => {
        // coupling with addEventListener in useEffect of selectedName

        //const abortController = new AbortController();

        //setBleAbortController(abortController);

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
                dateTime: new Date(),
                //name: selectedName,
                name: selectedNameRef.current,
                point: '0',
                uuid: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)),
              }]
              localStorage.setItem('logs', JSON.stringify(newLogs))
              return newLogs
            })
          }
          // if (isReset === 'true') {
          //   alert('reset')
          //   reset()
          // }
        //}, {signal: abortController.signal});
        });
        console.log('Notifications have been started.');
      })
      .catch(error => { console.error(error); window.location.reload(); });
    } else {
      alert('Already connected.');
    }
    //}, [selectedName])
  }, [isConnected])

  //const onDisconnect = useCallback(() => {
  //  if (!bleDevice) {
  //    return
  //  }
  //  if (bleDevice.gatt.connected) {
  //    bleDevice.gatt.disconnect()
  //  } else {
  //    console.log('Already disconnected')
  //  }
  //  setIsConnected(false)
  //  setBleDevice(null)
  //}, [bleDevice])

  //useEffect(() => {
  //  if (selectedName) {
  //    if (bleCharacteristic) {
  //      bleCharacteristic.startNotifications()
  //      .then(characteristic => {
  //        // coupling with addEventListener in scanAndConnect

  //        const abortController = new AbortController();

  //        setBleAbortControllerCharacteristic(abortController);

  //        characteristic.addEventListener('characteristicvaluechanged', (event) => {
  //          const value = event.target.value
  //          const decoder = new TextDecoder('utf-8')
  //          /*
  //            state 0 = show distance only
  //            state 1 = show distance & time
  //            state 2 = show latest distance & time

  //            time => ms
  //            distance => inch
  //          */
  //          const [state, distance, time] = decoder.decode(value).split(',')
  //          const distanceInch = +distance
  //          const timeN = +time
  //          const stateN = +state
  //          setDistance(distanceInch)
  //          setTime(timeN)
  //          setState(stateN)
  //          if (stateN === 2) {
  //            setLogs((prevLogs) => {
  //              const newLogs = [...prevLogs, {
  //                distance: distanceInch,
  //                time: timeN,
  //                dateTime: new Date(),
  //                name: selectedName,
  //              }]
  //              localStorage.setItem('logs', JSON.stringify(newLogs))
  //              return newLogs
  //            })
  //          }
  //        }, {signal: abortController.signal});
  //      });
  //    }
  //  }
  //}, [selectedName, bleCharacteristic])

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
    if(isConnected) {
      if ((alarmTimeMax >= 0) && (alarmTimeMin >= 0)) {
        const aTime = alarmTimeMax.toString();
        const bTime = alarmTimeMin.toString();
        const encoder = new TextEncoder('utf-8')
        bleCharacteristic.writeValue(encoder.encode(aTime + ',' + bTime));
        alert('Saved !!!')
      } else {
        alert('Time is not valid !!!')
      }
    } else {
      alert('Please connect to the device.')
    }
    //navigator.bluetooth.requestDevice({
    //  filters: [{
    //    name: bleName
    //  }],
    //  optionalServices: [serviceUUID]
    //})
    //.then(device => {
    //  console.log({ device })
    //  device.addEventListener('gattserverdisconnected', (event) => {
    //    const device = event.target;
    //    setIsConnected(false)
    //    console.log(`Device ${device.name} is disconnected.`)
    //  })
    //  return device.gatt.connect();
    //})
    //.then((server) => {
    //  console.log({ server })
    //  setIsConnected(server.connected)
    //  return server.getPrimaryService(serviceUUID)
    //})
    //.then((service) => {
    //  console.log({ service })
    //  return service.getCharacteristic(characteristicUUID)
    //})
    //.then(characteristic => {
    //  if (alarmTime >= 0) {
    //    const aTime = alarmTime.toString();
    //    const encoder = new TextEncoder('utf-8')
    //    // characteristic.writeValue(aTime);
    //    characteristic.writeValue(encoder.encode(aTime));
    //    alert('Saved !!!')
    //  } else {
    //    alert('Time is not valid !!!')
    //  }
    //})
    //.catch(error => { console.error(error); });
  }

  const onChangeName = useCallback((name) => {
    setSelectedName(name)
    
    //if (bleAbortControllerCharacteristic) {
    //  bleAbortControllerCharacteristic.abort()
    //}
    
    //onDisconnect()
  //}, [onDisconnect])
  //}, [bleAbortControllerCharacteristic])
  }, [])

  // return { distance, time, logs, isConnected, scanAndConnect, reset, clearLogs, setToggleTimer, isStarting, state }
  return { distance, time, logs, isConnected, scanAndConnect, clearLogs, state, alarmTimeMax, setAlarmTimeMax, alarmTimeMin, setAlarmTimeMin, onSaveAlarmTime, names, selectedName, setNames, setSelectedName, onChangeName, setLogs }
}

export default useBle
