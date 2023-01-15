import React, { useMemo } from 'react'

const Setting = ({ alarmTimeMax, setAlarmTimeMax, alarmTimeMin, setAlarmTimeMin, onSaveAlarmTime }) => {
  const timeMax = useMemo(() => {
    return alarmTimeMax / 1000
  }, [alarmTimeMax])

  const timeMin = useMemo(() => {
    return alarmTimeMin / 1000
  }, [alarmTimeMin])

  return (
    <div style={styles.container}>
      <div style={styles.distanceWrap}>
        <div style={styles.label}>Set Maximum Aiming Time (sec.)</div>
        <input type="number" style={styles.input} value={timeMax} onChange={(e) => {
          const newTime = +e.target.value * 1000
          setAlarmTimeMax(newTime)
        }} />

        <div style={styles.label}>Set Minimum Aiming Time (sec.)</div>
        <input type="number" style={styles.input} value={timeMin} onChange={(e) => {
          const newTime = +e.target.value * 1000
          setAlarmTimeMin(newTime)
        }} />

        <button style={styles.button} onClick={onSaveAlarmTime}>Save</button>
      </div>
    </div>
  )
}

export default Setting

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24
  },
  distanceWrap: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 30,
    padding: 10,
    margin: 20,
    textAlign: 'center',
    width: 100,
  },
  label: {
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
  },
  distance: {
    fontSize: 100
  },
  unit: {
    fontSize: 30,
  },
  timer: {
    marginTop: 30,
    fontSize: 35,
    marginBottom: 30,
  }
};
