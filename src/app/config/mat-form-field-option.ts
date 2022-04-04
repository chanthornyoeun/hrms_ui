import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

export const MAT_FORM_FIELD_PROVIDER = {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appearance: 'outline', floatLabel: 'auto' }
}
