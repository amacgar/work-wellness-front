import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public column: string[] = ['id', 'nombre'];

  public data: any = [{
    id: '12e12321',
    name: 'Alberto'
  }]

  @ViewChild(MatTable) tabla1: MatTable<any> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getAll() {

  }

}
