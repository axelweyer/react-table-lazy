import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import { AppState } from './interfaces/AppState';
import { RandomUserService } from './services/RandomUsersService';
import Config from './utils/Config';

class App extends React.Component<{}, AppState> {

  render() {
    const { isLoaded, dataSource, columns, error } = this.state;
    // different rendering depends on the API response
    if (error) {
      return <div>Error : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Table dataSource={dataSource} columns={columns} />
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
   * init state with API request
   */
  private initState() {

    RandomUserService.get(Config.size) // api request
      .then(res => res.json())
      .then((response: any) => {
        // set state with data
        this.setState({
          isLoaded: true,
          dataSource: response.results,
          columns: Config.columns
        });
      },
        (error: any) => {
          // data is loaded, but with an error
          this.setState({
            isLoaded: true,
            error
          })
        }
      );
  }
}

export default App;
