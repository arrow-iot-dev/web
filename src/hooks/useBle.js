import { useEffect, useState, useCallback, useRef } from 'react'

const serviceUUID = '52cf0b2c-28f2-4328-aaac-6badc36777d4'
const characteristicUUID = '051f540c-9a37-4284-9f98-2073e9f5bdfe'
const bleName = 'Arrow_ESP32'

const useBle = () => {
  const interval = useRef(null)
  // const [isScanning, setIsScanning] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [distance, setDistance] = useState(0)
  const [maxDistance, setMaxDistance] = useState(0)
  const [time, setTime] = useState(0)
  const [isReset, setIsReset] = useState(false)
  const [logs, setLogs] = useState([])

  const reset = useCallback(() => {
    setLogs((prevLogs) => {
      return [...prevLogs, {
        distance: maxDistance,
        time,
      }]
    })
    setIsReset(false)
    setIsReset(true)
    setMaxDistance(0)
    setTime(0)
  }, [time, maxDistance])

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
        const [distance, isReset] = decoder.decode(value).split(',')
        console.log({ distance, isReset })
        setDistance(+distance)
        if (isReset === 'true') {
          alert('reset')
          reset()
        }
      });
      console.log('Notifications have been started.');
    })
    .catch(error => { console.error(error); });
  }, [reset])

  useEffect(() => {
    if (isReset) {
      interval.current =  setInterval(() => {
        setTime(time => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval.current)
  }, [isReset])

  useEffect(() => {
    setMaxDistance((prevMax) => {
      if (distance > prevMax) {
        return distance
      }
      return prevMax
    })
  }, [distance])

  return { distance, time, logs, isConnected, scanAndConnect, reset }
}

export default useBle
