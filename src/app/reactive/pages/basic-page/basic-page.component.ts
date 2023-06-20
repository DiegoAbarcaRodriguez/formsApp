import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  /* -------------------------formulario reactivo creado de forma tradicional
  public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  });*/

  /* ------------------------formulario reactivo creado mediante FormBuilder */
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { // Inicializa valores del formulario al carga la página
    // this.myForm.reset({ name: 'RXT 50', price: 500, inStorage: 10 });
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters`;

      }
    }
    return null;
  }

  onSave() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); // Se marcan todos los formsControl como touched
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0 });

  }
}
