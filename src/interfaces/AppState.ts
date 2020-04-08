import Column from './../models/Column';

/**
 * App state interface
 */
export interface  AppState {

    isLoaded: boolean, 
    dataSource: any[], 
    columns: Column[],
    error: any
  };