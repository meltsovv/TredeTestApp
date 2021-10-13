import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/core/models/type-product.enum';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  id: string = '';
  routes: string[] = [RoutesEnum.Trade,RoutesEnum.Chart]

  constructor(private router: Router, public dataService: DataService) {}

  ngOnInit(): void {
  }

  routerChange(ev: number): void {
      this.router.navigate([this.routes[ev]])
  }
}
