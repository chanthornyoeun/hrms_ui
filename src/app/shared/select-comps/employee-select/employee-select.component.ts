import { HttpParams } from '@angular/common/http';
import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Employee } from 'src/app/models/leave-requst';
import { EmployeeService } from 'src/app/services/employee.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

@Component({
  selector: 'app-employee-select',
  templateUrl: './employee-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmployeeSelectComponent),
      multi: true
    }
  ]
})
export class EmployeeSelectComponent implements ControlValueAccessor, OnInit {

  employees: Employee[] = [];
  total: number = 0;
  offset: number = 0;
  limit: number = 50;
  ngControl!: NgControl;

  private _value!: number;

  constructor(private employeeService: EmployeeService, private injector: Injector) {
  }

  ngOnInit(): void {
    this.getEmployees();
    this.ngControl = this.injector.get(NgControl);
  }

  set value(val: number) {
    this._value = val;
    this.onChange(val);
    this.onTouch(val);
  }

  get value(): number {
    return this._value;
  }

  getEmployees() {
    const params: HttpParams = ParamsBuilder.build({ offset: this.offset, limit: this.limit });
    this.employeeService.list({ params })
      .subscribe(res => {
        this.employees.push(...res.data);
        this.total = res.total;
        this.offset += this.limit;
        const employee: Employee | undefined = this.employees.find(emp => emp.id === this.value);
        if (!employee) {
          this.getSelectedEmployee(this.value);
        }
      });
  }

  private getSelectedEmployee(employeeId: number) {
    if (!employeeId || typeof employeeId !== 'number') return;
    this.employeeService.get(employeeId).subscribe(res => this.employees.unshift(res.data));
  }

  trackEmployee(index: number, employee: Employee) {
    return employee ? employee.id : undefined;
  }

  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(employeeId: number): void {
    if (employeeId) {
      this.value = employeeId;
    };
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
