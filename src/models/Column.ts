/**
 * Column structure
 */
export default class Column {

    public label: string;
    public path: string;
    public sort: string

    constructor(label: string, sort: string) {
        this.path = label;
        const labels = label.split('.');
        this.label = labels[labels.length - 1]; // label is only the last label of the path
        this.sort = sort;
    }
}