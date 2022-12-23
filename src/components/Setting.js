import React, { useMemo } from 'react'

const Setting = ({ alarmTime, setAlarmTime, onSaveAlarmTime }) => {
  const time = useMemo(() => {
    return alarmTime / 1000
  }, [alarmTime])

	return (
		<div style={styles.container}>
			<div style={styles.distanceWrap}>
        <div style={styles.label}>Set Alarm Time (sec.)</div>
        <input type="number" style={styles.input} value={time} onChange={(e) => {
          const newTime = +e.target.value * 1000
          setAlarmTime(newTime)
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
