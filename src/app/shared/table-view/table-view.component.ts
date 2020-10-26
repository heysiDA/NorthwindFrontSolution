import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent <T> implements OnInit {

  @Input() items: object[] = [];
  @Input() columns: object[] = [];
  @Input() limit?: number;
  @Input() minTableHeight = 500;
  @Input() detailTemplate: TemplateRef<any>;

  @ViewChild('myTable') table: any;

  ngOnInit(): void {
  }

  toggleExpandRow(row){
    this.table.rowDetail.toggleExpandRow(row);
  }

}
