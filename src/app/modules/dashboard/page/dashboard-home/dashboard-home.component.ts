import { Component, OnInit, OnDestroy } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsDataTransferService } from 'src/app/services/products/products-data-transfer.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject<void>();
  public productList: Array<GetAllProductsResponse> = [];

  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;


  constructor (
    private productsService: ProductsService,
    private messageService: MessageService,
    private productsDtService: ProductsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productsService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.productList = response;
          this.productsDtService.setProductsDatas(this.productList);
          this.setProductsChartConfig();
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos!',
          life: 2500,
        });
      },
    });
  }

  setProductsChartConfig(): void {
    if(this.productList.length > 0){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.productsChartDatas = {
      labels: this.productList.map((element) => element?.name),
      datasets: [
        {
        label: 'Quantidade',
        backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
        borderColor: documentStyle.getPropertyValue('--indigo-400'),
        hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
        data: this.productList.map((element) => element?.amount),
        },
      ],
    };

    this.productsChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          }
        }
      },

      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder
          }
        },
        y:{
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    }
  }
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
