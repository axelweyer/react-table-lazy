import Column from './../models/Column';

/**
 * manual config for the project
 */
export default class Config {

    static size = 100;
    static columns = [
        new Column('name.title', 'asc'),
        new Column('name.first', 'asc'),
        new Column('name.last', 'asc'),
        new Column('location.country', 'asc'),
        new Column('email', 'asc')
    ];
};