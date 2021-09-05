import { useEffect, useState, useCallback, useRef } from 'react'
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64'

const manager = new BleManager()

const serviceUUID = '52cf0b2c-28f2-4328-aaac-6badc36777d4'
const charDistanceUUID = '051f540c-9a37-4284-9f98-2073e9f5bdfe' // of distance value
const charResetUUID = 'c4302375-ed4c-43cf-a35e-13e9a8cdfa87' // of reset button
const bleName = 'Arrow_ESP32'

const useBle = () => {
  const interval = useRef(null)
  const [isScanning, setIsScanning] = useState(true)
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
    console.log('scan')
    setIsScanning(true)
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('scan error', error)
        return error
      }
      console.log('device', device.id, device.name)
      if (device.name === bleName) {
        manager.stopDeviceScan()
        setIsScanning(false)
        device.connect()
          .then((myDevice) => {
            // console.log('device0', myDevice)
            return myDevice.discoverAllServicesAndCharacteristics()
          })
          .then((myDevice) => {
            console.log('device1', myDevice)
            // myDevice.monitorCharacteristicForService(
            //   serviceUUID,
            //   charResetUUID,
            //   (error, characteristic) => {
            //     console.log('c reset')
            //     if (error) {
            //       console.log('error reset', error)
            //       return
            //     }
            //     const value = base64.decode(characteristic.value)
            //     console.log({ value })
            //     if (value === 'true') {
            //       alert('reset')
            //       reset()
            //     }
            //   },
            // )
            myDevice.monitorCharacteristicForService(
              serviceUUID,
              charDistanceUUID,
              (error, characteristic) => {
                console.log('c distance')
                if (error) {
                  console.log('error distance', error)
                  return
                }
                const value = base64.decode(characteristic.value)
                console.log({ value })
                const [distance, isReset] = value.split(',')
                console.log({ distance, isReset })
                setDistance(+distance)
                if (isReset === 'true') {
                  alert('reset')
                  reset()
                }
              },
            )
          })
          .catch((error) => {
            console.log('connect error', error)
            throw error
          });
      }
    })
  }, [reset])

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanAndConnect();
        subscription.remove();
      } else {
        alert('Please enable bluetooth')
      }
    }, true);
    return () => subscription.remove();
  }, [])

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

  // console.log({ isScanning })
  return { distance, time, logs, reset, isScanning }
}

export default useBle
