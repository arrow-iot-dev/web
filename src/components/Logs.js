import React from 'react'

const FlatList = ({ data, keyExtractor, renderItem}) => {
	return (
		<div>
			{data.map((item, index) => {
				const key = keyExtractor(item, index)
				return (
					<div key={key}>
						{renderItem({ item, index })}
					</div>
				)
			})}
		</div>
	)
}

const Logs = ({ data = [], clearLogs }) => {
	const onClear = () => {
		const answer = window.confirm('Are you sure to clear all logs')
		if (answer) {
			clearLogs()
		}
	}

	return (
		<div style={styles.container}>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<button onClick={onClear}>clear</button>
			</div>
			<div style={styles.listItem}>
				<div style={{...styles.th, ...styles.number}}>No.</div>
				<div style={{...styles.th, ...styles.distance}}>Distance (in.)</div>
				<div style={{...styles.th, ...styles.time}}>Time (sec.)</div>
			</div>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => {
					const sTime = item.time / 1000
					// const s = (sTime % 60).toString().padStart(2, '0')
					// const m = Math.floor(sTime / 60).toString().padStart(2, '0')
					// const timer = `${m}:${s}`
					const timer = `${sTime}`
					return (
						<div style={styles.listItem}>
							<div style={styles.number}>#{index}</div>
							<div style={styles.distance}>{(item.distance || 0).toFixed(2)}</div>
							<div style={styles.time}>{timer}</div>
						</div>
					)
				}}
			/>
		</div>
	)
}

export default Logs

const styles = {
	container: {
		flex: 1,
		padding: 15,
    paddingBottom: 100,
	},
  title: {
		fontSize: 24
  },
	listItem: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 5,
		paddingBottom: 5,
	},
	th: {
		fontWeight: 'bold'
	},
	number: {
		flex: 1,
		fontSize: 20,
	},
	distance: {
		flex: 3,
		divAlign: 'right',
		fontSize: 20,
	},
	time: {
		flex: 3,
		divAlign: 'right',
		fontSize: 20,
	},
}
