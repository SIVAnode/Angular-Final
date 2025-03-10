import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [{
  path: 'home',
  loadChildren: () =>
    import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
  path: 'students',
  loadChildren: () =>
    import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
  path: 'courses',
  loadChildren: () =>
    import('./pages/courses/courses.module').then((m) => m.CoursesModule),
    },
    {
  path: 'users',
  canActivate:[adminGuard],
  loadChildren: () =>
    import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
  path: 'enrollments',
  loadChildren: () =>
    import('./pages/enrollments/enrollments.module').then((m) => m.EnrollmentsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }