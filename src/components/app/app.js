import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import ConstructorContainer from '../constructor-container/constructor-container';

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <AppHeader />
        <ConstructorContainer />
      </div>
    );
  }
}

export default App;
