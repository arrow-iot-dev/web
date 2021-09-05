import React from 'react'

const Home = ({ distance = 0, time = 0 }) => {
	const s = (time % 60).toString().padStart(2, '0')
	const m = Math.floor(time / 60).toString().padStart(2, '0')
	const timer = `${m}:${s}`
	return (
		<div style={styles.container}>
			<div style={styles.distanceWrap}>
				<div style={styles.label}>Distance</div>
				<div style={styles.distance}>{distance}</div>
				<div style={styles.unit}>centimeters</div>
				<div style={styles.timer}>Timer: {timer}s</div>
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
	}
};
