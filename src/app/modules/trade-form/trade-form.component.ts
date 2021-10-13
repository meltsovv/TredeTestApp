import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataTrade } from 'src/app/core/models/dataTrade';
import { DataService } from 'src/app/core/services/data.service';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.scss'],
})
export class TradeFormComponent implements OnInit {
  form: FormGroup;

  editId: string = '';

  maxDateEntry: Date =  new Date()

  maxDateExit: Date =  new Date()

  entryDataError: string = '';

  exitDataError: string = '';

  displayedColumns: string[] = ['id', 'entryPrice', 'entryDate', 'exitPrice', 'exitDate', 'profit', 'edit'];

  dataSource = new MatTableDataSource<DataTrade>(this.dataService.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(fb: FormBuilder, public dataService: DataService) {
    this.form = fb.group({
      entryPrice: ['', [Validators.required, Validators.min(0)]],
      entryDate: ['', [Validators.required]],
      exitPrice: ['', [Validators.required, Validators.min(0)]],
      exitDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.dataService.updateChart()
    this.dataService.page = 0;
    this.dataSource = new MatTableDataSource<DataTrade>(this.dataService.data);
    this.dataSource.paginator = this.paginator;
  }
  guidGenerator(): string {
    let S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4());
}
  submit() {
    if(this.form.valid) {
      if ((moment(this.form.value.exitDate)).valueOf() < (moment(this.form.value.entryDate)).valueOf()) {
        this.exitDataError = 'Exit date must be more than entry data';
      } else {
        this.exitDataError = '';
        this.dataService.data.push({
          id: this.guidGenerator(),
          entryPrice: this.form.value.entryPrice,
          entryDate: (moment(this.form.value.entryDate)).valueOf(),
          exitPrice: this.form.value.exitPrice,
          exitDate: (moment(this.form.value.exitDate)).valueOf()
        },)
        localStorage.setItem("data", JSON.stringify(this.dataService.data) )
        this.dataService.filterDataByDate();
        this.dataSource = new MatTableDataSource<DataTrade>(this.dataService.data);
        this.dataSource.paginator = this.paginator;
      }
    }
  };
  remove(id: string) {
    this.dataService.data = this.dataService.data.filter((el:DataTrade) => el.id !== id)
    this.dataSource = new MatTableDataSource<DataTrade>(this.dataService.data);
    this.dataSource.paginator = this.paginator;
    localStorage.setItem("data", JSON.stringify(this.dataService.data) )

  }
  edit(id: string) {
    this.editId = id
    let trade = this.dataService.data.filter((el: DataTrade) => el.id === id);
    this.form.get('entryPrice')?.patchValue(trade[0].entryPrice);
    this.form.get('entryDate')?.patchValue(moment(trade[0].entryDate).format());
    this.form.get('exitPrice')?.patchValue(trade[0].exitPrice);
    this.form.get('exitDate')?.patchValue(moment(trade[0].exitDate).format());
  }

  saveEdit() {
    if(this.form.valid) {
      let arr: DataTrade[] = []
      this.dataService.data.forEach(element => {
        arr.push(element.id === this.editId?{
          id: this.editId,
          entryPrice: this.form.value.entryPrice,
          entryDate: moment(this.form.value.entryDate).valueOf(),
          exitPrice: this.form.value.exitPrice,
          exitDate: moment(this.form.value.exitDate).valueOf(),
        }:element)
      });
      this.dataService.data = arr;
      localStorage.setItem("data", JSON.stringify(this.dataService.data) );
      this.dataSource = new MatTableDataSource<DataTrade>(this.dataService.data);
      this.dataSource.paginator = this.paginator;
      this.editId = '';
    }
  }
  getDateFormat(date: number) {
    return moment(date).format('MMMM-DD-YYYY HH:mm:ss')
  }
}
