import { Routes } from "@angular/router";
import { DashboardHomeComponent } from "./page/dashboard-home/dashboard-home.component";
import { AuthGuard } from "src/app/guards/auth.guard";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    canActivate: [AuthGuard],
  },
];
