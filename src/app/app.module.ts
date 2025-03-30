import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReportScheduleComponent } from './components/report-schedule/report-schedule.component';
import { DownloadReportsComponent } from './components/download-reports/download-reports.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CountUpModule } from 'countup.js-angular2';
import { ChartsModule } from 'ng2-charts';
import { RegisterAndLoginComponent } from './components/register-and-login/register-and-login.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorBasicAuthService } from './service/http/http-interceptor-basic-auth.service';
import { RouterModule } from '@angular/router';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AdminModuleComponent } from './components/admin-module/admin-module.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import {CommonModule} from '@angular/common';
import { Page404Component } from './components/page404/page404.component';
import { ResponsiveNavComponent } from './components/responsive-nav/responsive-nav.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CeiboShare } from 'ng2-social-share';




@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    NavBarComponent,
    ReportScheduleComponent,
    DownloadReportsComponent,
    HomePageComponent,
    RegisterAndLoginComponent,
    AdminModuleComponent,
    Page404Component,
    ResponsiveNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    CountUpModule,
    ChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    SocialLoginModule,
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi: true},
    {
    provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '712568026954-3mbl5re0f6gpmfu055enbc82qqnl9j1e.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
