import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableComponentDataSource } from './component-data';

@Component({
	selector: 'app-table-component',
	templateUrl: './component.html',
	styleUrls: ['./component.scss']
})
export class TableComponentComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatTable, { static: false }) table: MatTable<TableComponentItem>;
	dataSource: TableComponentDataSource;

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['id', 'name'];

	ngOnInit() {
		this.dataSource = new TableComponentDataSource();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}
}
