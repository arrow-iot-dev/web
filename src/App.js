import { useState, useMemo } from 'react';
import './App.css';
import Home from './components/Home'
import Logs from './components/Logs'
import useBle from './hooks/useBle'

// const isScanning = false
// const distance = 100
// const time = 90
// const data = [
//   {
//     distance: 100,
//     time: 90,
//   },
//   {
//     distance: 100,
//     time: 90,
//   },
//   {
//     distance: 100,
//     time: 90,
//   },
// ]

function App() {
  const { distance, time, logs: data, isConnected, scanAndConnect, clearLogs, isStarting, setToggleTimer } = useBle()
  const [tabKey, setTabKey] = useState('home') // home, logs
    const tabs = useMemo(() => ({
      home: {
        component: Home,
        props: { distance, time, isStarting, setToggleTimer },
      },
      logs: {
        component: Logs,
        props: { data, clearLogs }
      }
    }), [data, distance, time, clearLogs, setToggleTimer, isStarting])
    const Comp = tabs[tabKey].component
    const props = tabs[tabKey].props

    return (
      <div style={styles.container}>
        <div style={styles.status}>
          <div style={styles.scanningdiv}>{isConnected ? 'Connected' : 'Disconnected'}</div>
          {/* <button style={styles.button} onClick={reset}>Reset</button> */}
          <button style={styles.button} onClick={scanAndConnect}>Scan and Connect</button>
        </div>
        <div style={styles.content}>
          <Comp {...props} />
        </div>
        <div style={styles.tabs}>
          <div style={{...styles.tab, ...{ borderRightWidth: 1, borderRightColor: '#d0d0d0' }}} onClick={() => setTabKey('home')}>
            <div style={tabKey === 'home' ? styles.activeLabel : styles.inactiveLabel}>Home</div>
          </div>
          <div style={styles.tab} onClick={() => setTabKey('logs')}>
            <div style={tabKey === 'logs' ? styles.activeLabel : styles.inactiveLabel}>Logs</div>
          </div>
        </div>
      </div>
  );
}

export default App;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100vh',
  },
  content: {
    display: 'flex',
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F5F5DC',
    height: '100%',
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    letf: 0,
    right: 0,
    width: '100%',
    bottom: 0,
    borderTop: '1px solid #d0d0d0',
  },
  tab: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  activeLabel: {
    display: 'flex',
    color: 'green',
    fontWeight: 'bold'
  },
  inactiveLabel: {
    display: 'flex',
    color: '#444444',
  },
  scanningText: {
    display: 'flex',
    fontSize: 30
  },
  status: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {

  }
};
