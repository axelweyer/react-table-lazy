import { Component } from "react"

export class RandomUserService extends Component {

    /**
     * get users from web API
     * @param config 
     */
    static get(config: any) {
        return fetch('https://randomuser.me/api/?results=' + config.size)
    };
}