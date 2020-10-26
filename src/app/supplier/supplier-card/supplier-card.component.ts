import { Component, OnInit, Input } from '@angular/core';
import { Supplier } from '../model/supplier';

@Component({
  selector: 'app-supplier-card',
  templateUrl: './supplier-card.component.html',
  styleUrls: ['./supplier-card.component.css']
})
export class SupplierCardComponent implements OnInit {

  @Input() items: Supplier[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
