import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2RtlTreeviewComponent } from "./ng2-rtl-treeview/ng2-rtl-treeview.component"

@NgModule({
  declarations: [
    AppComponent,
    Ng2RtlTreeviewComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
