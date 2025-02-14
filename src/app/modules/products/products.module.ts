import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsHomeComponent } from './pages/products-home/products-home.component';
import { PRODUCTS_ROUTES } from './products.routing';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductFormComponent } from './components/product-form/product-form.component';


@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsTableComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule, FormsModule,
    ReactiveFormsModule,RouterModule.forChild(PRODUCTS_ROUTES),
    SharedModule,  HttpClientModule,
    // PrimeNG
    CardModule, TableModule,
    ButtonModule, InputMaskModule, InputSwitchModule,
    InputTextModule, InputTextareaModule, InputNumberModule,
    DynamicDialogModule, DropdownModule, ConfirmDialogModule,
    TooltipModule,

  ],
  providers: [DialogService, ConfirmationService],
})
export class ProductsModule { }
