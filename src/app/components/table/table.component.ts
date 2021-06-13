import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
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

  public consumptionSelected: Consumption = new Consumption(new Date().toISOString().split('T')[0], "0.0", "0.0", "0.0", "0.0", '0');

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatTable) tabla1: MatTable<Consumption> | undefined;

  constructor(private httpClient: HttpClient) {
    this.handler = new HandlerService(this.httpClient);
  }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    const res = await this.handler.getAll()
    this.data = new MatTableDataSource<any[]>(res);
    this.data.paginator = this.paginator;
  }

  public parseDate(element: any) {
    return new Date(element).toISOString().split('T')[0];
  }

  public async add() {
    const data = { _id: this.consumptionSelected._id, date: this.consumptionSelected.date, hour: this.consumptionSelected.hour, 
                   consumption: this.consumptionSelected.consumption, price: this.consumptionSelected.price, 
                   pricePerHour: this.consumptionSelected.pricePerHour};
    await this.handler.insert(data);
    await this.getAll();
    this.tabla1?.renderRows();
    this.consumptionSelected = new Consumption(new Date().toISOString().split('T')[0], "0.0", "0.0", "0.0", "0.0", '0');
  }

  public async delete(element: any) {
    if (confirm('Realmente quiere borrarlo?')) {
      await this.handler.delete(this.data[element]);
      await this.getAll();
      this.tabla1?.renderRows();
    }
  } 

  public async update(element: any) {
    const res = await this.handler.getAll();
    const data = res[element];
    this.consumptionSelected = new Consumption(new Date(data.date).toISOString().split('T')[0], 
                                               data.hour, data.consumption, data.price, data.pricePerHour, data._id);
  }

}
