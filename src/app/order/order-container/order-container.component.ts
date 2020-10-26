import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { OrderContainerService } from './order-container.service';
import { OrderList } from '../models/order-list';
import { TableViewComponent } from 'src/app/shared/table-view/table-view.component';

@Component({
  selector: 'app-order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.css']
})
export class OrderContainerComponent implements OnInit, AfterViewInit {

  items: OrderList[] = [];
  columns: object[] = [];
  detailColumns: object[] = [];
  numberOfRecords = 0;
  pageSizeOptions: number[] = [10, 21, 42];
  pageSize = 10;
  pageIndex = 0;

  @ViewChild('tableView') tableView: TableViewComponent<any>;
  @ViewChild('orderIdCellTemplate') private orderIdCellTemplate: TemplateRef<any>;
  @ViewChild('orderNumberCellTemplate') private orderNumberCellTemplate: TemplateRef<any>;

  constructor(private ref: ChangeDetectorRef, private serviceOrder: OrderContainerService) { }
  ngAfterViewInit(): void {
    this.columns = this.getColumns();
    this.detailColumns = this.getDetailsColumns();
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.getOrders(1, 10);
    // this.columns = this.getColumns();
    // this.detailColumns = this.getDetailsColumns();
  }


  getOrders(page: number, rows: number): void {
    this.serviceOrder.getOrderList(page, rows).subscribe(resp => {
      this.items = resp;
      this.numberOfRecords = resp[0].totalRecords;
    });
  }

  getColumns(): object[] {
    return [
      {
        name: 'Id',
        flexGrow: 0.5,
        cellTemplate: this.orderIdCellTemplate
      },
      {
        name: 'Customer',
        flexGrow: 1,
        prop: 'customer'
      },
      {
        name: 'Total',
        flexGrow: 0.5,
        prop: 'totalAmount'
      },
      {
        name: '# Order',
        flexGrow: 0.5,
        cellTemplate: this.orderNumberCellTemplate
      }
    ];
  }
  getDetailsColumns(): object[] {
    return [
      {
        name: 'Product',
        flexGrow: 0.5,
        prop: 'productName'
      },
      {
        name: 'Unit Price',
        flexGrow: 0.5,
        prop: 'unitPrice'
      },
      {
        name: 'Quantity',
        flexGrow: 0.5,
        prop: 'quantity'
      }
    ];
  }

  toggleExpandRow(row){
     this.tableView.toggleExpandRow(row);
     this.ref.detectChanges();
  }

  changePage(event: any) {
    this.getOrders(event.pageIndex + 1, event.pageSize);
  }

}
