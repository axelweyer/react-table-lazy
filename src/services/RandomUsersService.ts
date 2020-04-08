import { Component } from "react"

export class RandomUserService extends Component {

    /**
     * get users from web API
     * @param config 
     */
    static get(size: number) {
        return fetch('https://randomuser.me/api/?results=' + size)
    };
}