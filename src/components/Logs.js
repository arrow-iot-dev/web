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

const Logs = ({ data = [] }) => {
	return (
		<div style={styles.container}>
			<div style={styles.listItem}>
				<div style={{...styles.th, ...styles.number}}>No.</div>
				<div style={{...styles.th, ...styles.distance}}>Distance (cm.)</div>
				<div style={{...styles.th, ...styles.time}}>Time (mm:ss)</div>
			</div>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => {
					const s = (item.time % 60).toString().padStart(2, '0')
					const m = Math.floor(item.time / 60).toString().padStart(2, '0')
					const timer = `${m}:${s}`
					return (
						<div style={styles.listItem}>
							<div style={styles.number}>#{index}</div>
							<div style={styles.distance}>{item.distance}</div>
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
