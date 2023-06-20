import { emailValidatorService } from './../../../shared/validators/email-validator.service';
import { validatorsService } from './../../../shared/services/validators.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


//-------------Funciones de validación personalizada
//import * as customValidators from './../../../shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualToFieldTwo('password','password2')
    ]
  }); //Validator a nivel de formulario

  constructor(
    private fb: FormBuilder,
    private validatorsService: validatorsService,
    private emailValidator: emailValidatorService
  ) { }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }
}
