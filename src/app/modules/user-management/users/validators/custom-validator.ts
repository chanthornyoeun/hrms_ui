import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, map } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { ParamsBuilder } from "src/app/utilities/params-builder";

export function passwordMismatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password: string = control.get('password')?.value;
        const confirmPassword: string = control.get('confirmPassword')?.value;
       
        if (!confirmPassword) {
            return null;
        }

        if (password !== confirmPassword) {
            const error = { misMatch: true };
            control.get('confirmPassword')?.setErrors({ misMatch: true });
            return error;
        }
       
        control.get('confirmPassword')?.setErrors(null);
        return null;
    }
}

export function validateExistingUser(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return userService.list({ params: ParamsBuilder.build({ search: control.value }) })
            .pipe(
                map(res => res.total > 0 ? { existed: true } : null)
            )
    }
}
