import React, { useMemo } from 'react'

const Home = ({ distance = 0, time = 0, state = 0 }) => {
	const timer = useMemo(() => {
		const sTime = time / 1000
		const s = (sTime % 60).toString().padStart(2, '0')
		const m = Math.floor(sTime / 60).toString().padStart(2, '0')
		return `${m}:${s}`
	}, [time])

	return (
		<div style={styles.container}>
			<div style={styles.distanceWrap}>
				<div style={styles.label}>Distance</div>
				<div style={styles.distance}>{(distance || 0).toFixed(2)}</div>
				<div style={styles.unit}>Inches</div>
				{
					state > 0 && (
						<div style={styles.timer}>Timer: {timer}s</div>
					)
				}
			</div>
		</div>
	)
}

export default Home

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
	label: {
		fontSize: 30,
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
