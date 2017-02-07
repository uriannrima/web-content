import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TypeaheadComponent } from './typeahead';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, TypeaheadComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
