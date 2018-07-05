interface iApp {
    foo: string
    bar: number
}

export default class App implements iApp {
    foo: string;

    bar: number;
    
    constructor () {
        console.log('I am one app')
    }
}