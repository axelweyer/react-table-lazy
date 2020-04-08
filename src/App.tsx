import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import { AppState } from './interfaces/AppState';
import { RandomUserService } from './services/RandomUsersService';

class App extends React.Component<{}, AppState> {

  render() {
    const { isLoaded, dataSource, error } = this.state;
    // different rendering depends on the API response
    if (error) {
      return <div>Error : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Table dataSource={dataSource} />
      );
    }
  }

  constructor(props: any) {
    super(props);
    this.state = {
      isLoaded: false,
      dataSource: [],
      columns: [],
      error: null
    };
  }

  componentDidMount() {
    this.initState(); // get users when component is mounted
  }

  /**
   * 
   */
  private initState() {
    const config = {
      size: 100
    }
    RandomUserService.get(config)
      .then(res => res.json())
      .then((response: any) => {
        console.log('responseJson', response);
        this.setState({
          isLoaded: true,
          dataSource: response.results
        });
      },
        (error: any) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      );
  }
}

export default App;
