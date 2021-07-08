import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpStudentService } from 'src/app/shared/services/http-student.service';
import { Student } from 'src/app/shared/interfaces/student';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students!: Student[];
  groups!: String[];
  specialisations!: String[];
  specialisation!: String;
  group!: string;
  searchSurname!: string;

  constructor(
    private httpStudentService: HttpStudentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    try {
      this.students = (await this.httpStudentService.getStudents()) || [];
    } catch (error) {
      console.log(error);
    }
    this.studentsSort();
    console.log(this.students);
    this.groups = this.students.map(x => x.group.toLowerCase());
    this.groups = this.groups.filter((value, index) => this.groups.indexOf(value)===index)
    this.specialisations = this.students.map(x => x.specialisation.toLowerCase());
    this.specialisations = this.specialisations.filter((value, index) => this.specialisations.indexOf(value)===index)
  }

  linkToStudent(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, "student", id])
    } else {
      this.router.navigate([this.router.url, "student"])
    }

  }
  async fillterByGroup() {
    try {
      this.students = await this.httpStudentService.getStudents();
    } catch (error) {
      console.log(error);
    }

    this.students = this.students.filter(student => student.group.toLowerCase() == this.group.toLowerCase());
    this.studentsSort();
    console.log(this.students);
  }
  async fillterBySpecialisation() {
    try {
      this.students = await this.httpStudentService.getStudents();
    } catch (error) {
      console.log(error);
    }

    this.students = this.students.filter(x => x.specialisation.toLowerCase() == this.specialisation.toLowerCase());
    this.studentsSort();
    console.log(this.students);
  }

  async resetFilter() {
    this.getData();
    this.group = null;
    this.specialisation = null;
    this.searchSurname = null;
  }
  async fillterBySearch() {
    try {
      this.students = await this.httpStudentService.getStudents();
    } catch (error) {
      console.log(error);
    }

    this.students = this.students.filter(student => student.surname.toLowerCase().includes(this.searchSurname.toLowerCase()));
    this.studentsSort();
    console.log(this.students);
  }
  studentsSort() {
    this.students.sort(function (studentA, studentB) {
      if (studentA.surname.toLowerCase() > studentB.surname.toLowerCase()) {
        return 1;
      }
      if (studentA.surname.toLowerCase() < studentB.surname.toLowerCase()) {
        return -1;
      }
      return 0;
    });;
  }
  getFirstLetter(text:string) {
    return text?.charAt(0);

  }

}
