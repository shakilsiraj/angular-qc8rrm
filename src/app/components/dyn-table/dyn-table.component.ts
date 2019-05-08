import {
    AfterContentInit, Component, ContentChild,
    ContentChildren, EventEmitter, Input,
    OnChanges, OnInit, ViewChildren,
    Output, QueryList, ViewChild
} from '@angular/core';
import {
    MatColumnDef, MatHeaderRowDef, MatPaginator,
    MatRowDef, MatSort, MatSortable, MatTable,
    MatSortHeader, MatTableDataSource
} from '@angular/material';
import { DynColumnComponent } from './dyn-column.component';

@Component({
  selector: 'app-dyn-table',
  templateUrl: './dyn-table.component.html'
})
export class DynTableComponent<T> implements OnChanges, AfterContentInit {

  @ContentChildren(DynColumnComponent) dynColumns: QueryList<DynColumnComponent<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ContentChild(MatHeaderRowDef) headerRowDef: MatHeaderRowDef;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChild(MatSort) sort: MatSort;

  @ViewChild(MatTable) table: MatTable<T>;

  @Input() displayedColumns: any;
  @Input() data: any;

  public dataSource = new MatTableDataSource([]);

  constructor() { }

  ngOnChanges() {
    if (this.data) {
      this.setData(this.data);
    }
  }

  ngAfterContentInit() {
    // console.log(this.dynColumns, this.columnDefs);
    this.dynColumns.forEach(dynColumn => this.table.addColumnDef(dynColumn.columnDef));
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));

    // this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    // this.table.addHeaderRowDef(this.headerRowDef);
  }

  setData(data) {
    if (Array.isArray(data)) {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
