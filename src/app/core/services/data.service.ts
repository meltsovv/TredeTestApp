import { Injectable } from '@angular/core';
import { DataTrade } from '../models/dataTrade';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: DataTrade[] = [];

  page: number = 0;

  options: any = {}

  balance(): number {
    let balance: number = 0;
    if (this.data.length){
      let data:DataTrade[]  = []
      this.data.forEach((element:DataTrade) => {
        data.push(element)
      })
      data.reverse().forEach((element:DataTrade, index: number) => {
        if (index === 0) {
          balance = element.entryPrice;
        }
        balance = balance + (element.exitPrice - element.entryPrice)
      });
      return balance;
    }
    return balance;
  }

  filterDataByDate() {
    this.data.sort((a,b) => b.exitDate - a.exitDate)
  }

  updateChart() {
    this.data = localStorage.getItem('data') || ''
        ? JSON.parse(localStorage.getItem('data') || '')
        : [];
    let timeData: string[] = [];
    let balanceData: number[] = [];
    let profit: number[] = [];
    let balance: number = 0;
    this.filterDataByDate();
    if (this.data.length){
      let data:DataTrade[]  = []
      this.data.forEach((element:DataTrade) => {
        data.push(element)
      })
      data.reverse().forEach((element:DataTrade, index: number) => {
        if (index === 0) {
          balance = element.entryPrice;
        }
        profit.push(element.exitPrice - element.entryPrice);
        balance = balance + (element.exitPrice - element.entryPrice)
        timeData.push(moment(element.exitDate).format('MMMM-DD-YYYY HH:mm:ss'))
        balanceData.push(balance)
      });
    }
    this.options = {
      legend: {
        data: ['Balance','Profit'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: timeData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Balance',
          type: 'line',
          data: balanceData,
          animationDelay: (idx: any) => idx * 10,
        },
        {
          name: 'Profit',
          type: 'line',
          data: profit,
          animationDelay: (idx: any) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: any) => idx * 5,
    };
  }
}
