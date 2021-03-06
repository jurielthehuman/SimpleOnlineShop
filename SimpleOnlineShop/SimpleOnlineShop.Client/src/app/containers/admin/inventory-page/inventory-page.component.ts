import {Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit} from '@angular/core';
import { Inventory } from '../../../core/models/inventory';
import { Observable } from 'rxjs/Observable';

import {MdDialog} from '@angular/material';
import { CreateInventoryComponent } from '../../../components/inventory/create-inventory/create-inventory.component';
import { DeleteInventoryComponent } from '../../../components/inventory/delete-inventory/delete-inventory.component';
import { AddProductComponent } from '../../../components/inventory/add-product/add-product.component';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../core/store/reducers/index';
import * as action_ from '../../../core/store/actions/inventory';
import delay from 'delay';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InventoryPageComponent implements OnInit {

  inventories$: Observable<Inventory[]>;

  selectedInventory: Inventory;
  selectedInventory$: Observable<Inventory>;

  selectedInventoryId: number;
  loading$: Observable<boolean>;

  constructor(private dialogCreate: MdDialog,
              private dialogDelete: MdDialog,
              private dialogAddProduct: MdDialog,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new action_.InventoriesLoadAction());
    this.inventories$ = this.store.select(fromRoot.inventories);
    this.loading$ = this.store.select(fromRoot.isInventoryLoading);
  }
//noinspection TsLint
  createDialog() {
    this.dialogCreate.open(CreateInventoryComponent, {
      width: '400px',
      height: '300px'
    });
    this.dialogCreate.afterAllClosed
      .debounceTime(200)
      .subscribe(() => {
        this.store.dispatch(new action_.InventoriesLoadAction());
        this.selectedInventory = null;
      });
  }

  deleteDialog() {
    this.dialogDelete.open(DeleteInventoryComponent, {
      width: '400px',
      height: '150px',
      data: this.selectedInventory
    });
    this.dialogDelete.afterAllClosed
      .debounceTime(200)
      .subscribe(() => {
        this.store.dispatch(new action_.InventoriesLoadAction());
      });
  }

  addProductDialog() {
    this.dialogAddProduct.open(AddProductComponent, {
      width: '400px',
      height: '455px',
      data: this.selectedInventory
    });
    this.dialogAddProduct.afterAllClosed
      .debounceTime(200)
      .subscribe(() => {
        this.store.dispatch(new action_.InventoryLoadAction(this.selectedInventoryId));
      });
  }

  deleteProductDialog(productId: number) {
    this.store.dispatch(new action_.InventoryDeleteInventoryProductAction({inventoryId: this.selectedInventoryId, productId: productId}));
    delay(200, {}).then(() => {
      this.store.dispatch(new action_.InventoryLoadAction(this.selectedInventoryId));
      this.store.select(fromRoot.inventory).subscribe(res => this.selectedInventory = res);
    });
  }

  onChange() {
    this.store.dispatch(new action_.InventoryLoadAction(this.selectedInventoryId));
    this.selectedInventory$ = this.store.select(fromRoot.inventory);
    this.selectedInventory$.subscribe(res => this.selectedInventory = res);
  }
}
