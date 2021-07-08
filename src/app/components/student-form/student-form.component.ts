import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/interfaces/student';
import { HttpStudentService } from 'src/app/shared/services/http-student.service';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  id: number | null = null;
  StudentForm!: FormGroup;
  students!: Student[];
  student!: Student;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpStudenService: HttpStudentService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getData();
    })
  }

  async getData() {
    const controls = {
      name: [null, [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁё]*")]],
      surname: [null, [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁё]*")]],
      patronymic: [null],
      telephone: [null, [Validators.required, Validators.pattern("[0-9]{11}")]],
      email: [null, [Validators.required, Validators.email]],
      dateOfBirth: [null, [Validators.required]],
      group: [null, [Validators.required]],
      specialisation: [null, [Validators.required]],
    }
    this.StudentForm = this.formBuilder.group(controls);
    try {
      this.students = await this.httpStudenService.getStudents();
    } catch (error) {
      console.log(error);
    }
    if (this.id) {
      try {
        this.student = await this.httpStudenService.getStudent(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.StudentForm.patchValue(this.student);
    } else {
      this.StudentForm.reset();
    }
  }
async onAddStudent() {
  if (this.id) {
    const student:Student = this.StudentForm.value;
    try {
      await this.httpStudenService.putStudent(student, this.id);
    } catch (error) {
      console.log(error);
    }
  }else {
    const student:Student = this.StudentForm.value;
    try {
      const studentResult = await this.httpStudenService.postStudent(student);
      this.router.navigate([this.router.url, studentResult.id]);
    } catch (error) {
      console.log(error);
    }
  }
}

async onDeleteStudent() {
  if (this.id) {
  try {
    await this.httpStudenService.deleteStudent(this.id);
    this.router.navigate(['/students']);
  } catch (error) {
    console.log(error);
    return;
  }
}
}
onResetStudent() {
  this.StudentForm.patchValue(this.student);
}


}
