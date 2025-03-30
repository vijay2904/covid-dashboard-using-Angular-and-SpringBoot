import { NgModule } from '@angular/core';
import { TooltipModule } from 'ng2-tooltip-directive';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { DownloadReportsComponent } from './components/download-reports/download-reports.component';
import { ReportScheduleComponent } from './components/report-schedule/report-schedule.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterAndLoginComponent } from './components/register-and-login/register-and-login.component';
import { RouteGaurdServiceService }  from './service/http/route-gaurd-service.service';
import { AdminModuleComponent } from './components/admin-module/admin-module.component';
import { Page404Component } from './components/page404/page404.component';
import { AdminGuardService } from './service/http/admin-guard.service';







const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent},
  { path: 'about', component: AboutPageComponent},
  { path: 'download', component: DownloadReportsComponent, canActivate:[RouteGaurdServiceService]},

  { path: 'schedule', component: ReportScheduleComponent, canActivate:[RouteGaurdServiceService] },
  { path: 'registerorlogin', component: RegisterAndLoginComponent},
  { path: 'adminModule', component: AdminModuleComponent, canActivate:[AdminGuardService]},
  { path: '**', component: Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, TooltipModule],
})


export class AppRoutingModule { }
