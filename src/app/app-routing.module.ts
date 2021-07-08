import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentLayoutComponent } from './components/student-layout/student-layout.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';

const routes: Routes = [
  {
    path:'',
    component: StudentLayoutComponent,
    children: [
      {
        path:'',
        component: MainPageComponent, //поменять
      },
      {
        path:'students',
        component: StudentListComponent,
      },
      {
        path:'students/student',
        component: StudentFormComponent
      },
      {
        path:'students/student/:id',
        component: StudentFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
