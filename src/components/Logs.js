import React, { useState } from 'react'
import dayjs from 'dayjs'

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

const Logs = ({ data = [], clearLogs, names, setNames, selectedName, setSelectedName }) => {
	const [value, setValue] = useState('')
	const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))

	const list = data.filter((item) => item.name === selectedName && dayjs(item.dateTime).isSame(date, 'date'))

	const onClear = () => {
		const answer = window.confirm('Are you sure to clear all logs')
		if (answer) {
			clearLogs()
		}
	}
	const onExport = () => {
		const columns = 'No.,Distance(in.),Time(sec.),Name,Date Time'
		const text = [columns, ...list.map((log, index) => `${index + 1},${(log.distance || 0).toFixed(2)},${log.time / 1000},${log.name},${log.dateTime}`)].join('\n')
		const content = `data:text/csv;charset=utf-8,${text}`
		const encodedUri = encodeURI(content)
		window.open(encodedUri)
	}

	return (
		<div style={styles.container}>
			<div style={{ marginBottom: 10}}>
				<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
			</div>
			<div style={{ marginBottom: 10}}>
				<input value={value} onChange={(e) => setValue(e.target.value)} />
				<button onClick={() => {
					setNames(names => {
						const newValue = [...names, value]
						localStorage.setItem('names', JSON.stringify(newValue))
						return newValue
					})
					setValue('')
				}}>+ Add</button>
			</div>
			<div style={styles.nameRow}>
				{names.map((name) =>
					<div style={name === selectedName ? styles.activeTag : styles.tag}>
						<span onClick={() => setSelectedName(name)}>{name}</span>
						<span style={{ cursor: 'pointer'}} onClick={() => {
							setNames(names => {
								const newValue = names.filter(n => n !== name)
								localStorage.setItem('names', JSON.stringify(newValue))
								return newValue
							})
						}}>X</span>
					</div>
				)}
			</div>
			<hr />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<button onClick={onClear}>Clear</button>
				<button onClick={onExport}>Export</button>
			</div>
			<div style={styles.listItem}>
				<div style={{...styles.th, ...styles.number}}>No.</div>
				<div style={{...styles.th, ...styles.distance}}>Distance (in.)</div>
				<div style={{...styles.th, ...styles.time}}>Time (sec.)</div>
			</div>
			<FlatList
				data={list}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => {
					const sTime = item.time / 1000
					// const s = (sTime % 60).toString().padStart(2, '0')
					// const m = Math.floor(sTime / 60).toString().padStart(2, '0')
					// const timer = `${m}:${s}`
					const timer = `${sTime}`
					return (
						<div style={styles.listItem}>
							<div style={styles.number}>#{index + 1}</div>
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
	tag: {
		border: '1px solid #d0d0d0',
		backgroundColor: '#fff',
		padding: 5,
		width: 'fit-content',
		display: 'flex',
		gap: 3,
	},
	activeTag: {
		border: '3px solid lime',
		backgroundColor: '#d0d0d0',
		padding: 5,
		width: 'fit-content',
		display: 'flex',
		gap: 3,
	},
	nameRow: {
		display: 'flex',
		gap: 5,
	}
}
