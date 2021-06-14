class Consumption {
    _id?: String;
    date: String;
    hour: any;
    consumption: any;
    price: any;
    pricePerHour: any;

    constructor ( date: String, hour: String, consumption: String, price: String, pricePerHour: String, id?: String ) {
        this.date = date;
        this.hour = hour;
        this.consumption = consumption;
        this.price = price;
        this.pricePerHour = pricePerHour;
        this._id = id ? id : '';
    }
}

export default Consumption;