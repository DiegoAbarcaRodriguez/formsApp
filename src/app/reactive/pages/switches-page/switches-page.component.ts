import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  public person = {
    gender: 'M',
    wantNotifications: false
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }


  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    //Extrae termsAndContions de forma independiente, las demás propertys son asignadas al objeto newPerson
    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;

  }
}
