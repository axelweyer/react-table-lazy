import { Component } from "react"

export class RandomUserService extends Component {

    private static url = 'https://randomuser.me/api/?results=';

    /**
     * get users from web API
     * @param config 
     */
    static get(size: number) {
        return fetch(this.url + size);
    };
}