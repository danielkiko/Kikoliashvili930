import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentLayoutComponent } from './components/student-layout/student-layout.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    StudentLayoutComponent,
    StudentListComponent,
    MainPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
