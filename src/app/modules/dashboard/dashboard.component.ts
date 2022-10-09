import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  widgets = [
    {
      id: 'totalEmployee',
      title: 'Employees',
      counter: 100,
      link: {
        text: 'See all employees',
        url: '/employees'
      },
      percentage: 0,
      class: '',
      icon: 'groups'
    },
    {
      id: 'totalPresent',
      title: 'Today Present',
      counter: 90,
      link: {
        text: 'See all attendances',
        url: '/daily-attendant'
      },
      percentage: 0,
      class: 'positive',
      icon: 'person'
    },
    {
      id: 'totalLeaveToday',
      title: 'Today Leave',
      counter: 10,
      link: {
        text: 'See all leaves',
        url: '/employee-leave'
      },
      percentage: 0,
      class: 'negative',
      icon: 'person_off'
    },
    {
      id: 'totalLeaveUpcoming',
      title: 'Upcoming Leave',
      counter: 5,
      link: {
        text: 'See all upcoming leave',
        url: '/employee-leave'
      },
      percentage: 0,
      class: 'negative',
      icon: 'person_off'
    }
  ];
  isLoading: boolean = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.dashboardService.getData()
      .pipe(finalize(() => {
        setTimeout(() => this.isLoading = false, 500)
      }))
      .subscribe(res => {
        this.transform(res.data);
      });
  }

  private transform(data: any) {
    const totalEmployee = data.totalEmployee;
    this.widgets.forEach(w => {
      w.counter = data[w.id];
      w.percentage = (data[w.id] * 100 / totalEmployee) / 100;
    });
  }

}
