import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import Consumption from 'src/app/types/consumption';
import { HandlerService } from '../../service/handler.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public column: string[] = ['_id', 'fecha', 'hora', 'consumo','precio', 'precio por hora', 'borrar', 'update'];

  private handler: HandlerService;

  public data: any;

  public columnSelected: string = '';

  public valueToFind: String = '';

  public formError: Boolean = false;

  public regexp: RegExp = new RegExp('^[0-9.,]*$');

  public selectList: string[] = ['id', 'fecha', 'hora', 'consumo','precio', 'precio por hora'];

  public transform: any = {'id': '_id', 'fecha': 'date', 'hora': 'hour', 'consumo': 'consumption', 'precio': 'price', 'precio por hora': 'pricePerHour'};

  public consumptionSelected: Consumption = new Consumption(new Date().toISOString().split('T')[0], "0.0", "0.0", "0.0", "0.0", '0');

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatTable) tabla1: MatTable<Consumption> | undefined;

  constructor(private httpClient: HttpClient) {
    this.handler = new HandlerService(this.httpClient);
  }

  ngOnInit(): void {
    this.getAll();
  }

  public async getAll() {
    const res = await this.handler.getAll()
    this.data = new MatTableDataSource<any[]>(res);
    this.data.paginator = this.paginator;
  }

  public parseDate(element: any) {
    return new Date(element).toISOString().split('T')[0];
  }

  public async add() {
    const error: Boolean[] = this.validateForm();
    if (error.every( e => e === true)) {
      const data = { 
        _id: this.consumptionSelected._id, 
        date: this.consumptionSelected.date, 
        hour: this.consumptionSelected.hour, 
        consumption: this.consumptionSelected.consumption, 
        price: this.consumptionSelected.price, 
        pricePerHour: this.consumptionSelected.pricePerHour
      };
      await this.handler.insert(data);
      await this.refresh();
      this.consumptionSelected = new Consumption(new Date().toISOString().split('T')[0], "0.0", "0.0", "0.0", "0.0", '0');
    } else {
      this.formError = true;
    }
  }

  public async delete(element: any) {
    if (confirm('Realmente quiere borrarlo?')) {
      const res = await this.handler.getAll();
      await this.handler.delete(res[element]);
      await this.refresh();
    }
  } 

  public async update(element: any) {
    const res = await this.handler.getAll();
    const data = res[element];
    this.consumptionSelected = new Consumption(this.parseDate(data.date),data.hour, data.consumption, 
      data.price, data.pricePerHour, data._id);
  }

  public async find() {
    const element: any = {};
    element[this.transform[this.columnSelected]] = this.valueToFind.trim();
    const res = await this.handler.find(element);
    this.data = new MatTableDataSource<any[]>(res);
    this.data.paginator = this.paginator;
    this.tabla1?.renderRows();
  }

  public async refresh() {
    await this.getAll();
    this.tabla1?.renderRows();
  }

  public validateForm(): Boolean[] {
    const error: Boolean[] = [];
    error.push(this.regexp.test(this.consumptionSelected.hour));
    error.push(this.regexp.test(this.consumptionSelected.consumption));
    error.push(this.regexp.test(this.consumptionSelected.price));
    error.push(this.regexp.test(this.consumptionSelected.pricePerHour));
    return error;
  }

  //TODO rematar la documentacion
}
