export class IndianStatesFormat {
    id: number;
    state: any;
    constructor(response: any) {
        this.id = response.id;
        this.state = response.state;
        
    }
}