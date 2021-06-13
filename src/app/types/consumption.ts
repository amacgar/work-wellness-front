class Consumption {
    _id?: String;
    date: String;
    hour: String;
    consumption: String;
    price: String;
    pricePerHour: String;

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