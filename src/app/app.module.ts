import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SharedModule } from './@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { CustomMaterial } from './custom-material.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, DetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CustomMaterial,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
