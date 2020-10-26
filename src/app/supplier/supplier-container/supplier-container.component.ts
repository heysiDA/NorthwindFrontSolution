import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { SwitchViewComponent } from 'src/app/shared/switch-view/switch-view.component';
import { Supplier } from '../model/supplier';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-supplier-container',
  templateUrl: './supplier-container.component.html',
  styleUrls: ['./supplier-container.component.css']
})
export class SupplierContainerComponent implements OnInit, AfterViewInit {

  items: Supplier[] = [];
  @ViewChild('cardViewTemplate') private cardViewTemplate: TemplateRef<any>;
  @ViewChild('tableViewTemplate') private tableViewTemplate: TemplateRef<any>;
  templates: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
  defaultTemplate: string;

  pageSizeOptions: number[] = [10, 21, 42];
  pageSize = 10;
  pageIndex = 0;
  searchControl: FormControl = new FormControl();
  constructor(private ref: ChangeDetectorRef, private serviceSupplier: SupplierService) { }

  ngAfterViewInit(): void {
    this.templates.set(SwitchViewComponent.CARD_KEY, this.cardViewTemplate);
    this.templates.set(SwitchViewComponent.TABLE_KEY, this.tableViewTemplate);
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.defaultTemplate = SwitchViewComponent.CARD_KEY;
    this.getSuppliers(1, 10);
    // filter(text => text.length >= 3)
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(val => {
        this.getSuppliers(1, 10, val);
      });
  }

  getSuppliers(page: number, rows: number, searchTerm: string = ''){
    this.serviceSupplier.getSupplierList(page, rows, searchTerm)
    .subscribe(resp => {
      this.items = resp;
    });
  }

  // changePage(event: any) {
  //   this.getSuppliers(event.pageIndex + 1, event.pageSize);
  // }



}
