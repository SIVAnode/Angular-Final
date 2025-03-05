import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { HelpersModule } from '../../../../helpers/helpers.module';
import {MatDialogModule} from '@angular/material/dialog';
import { StudentsDetailComponent } from './pages/students-detail/students-detail.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    HelpersModule,
    MatDialogModule,
  ],
  exports:[StudentsComponent]
})
export class StudentsModule { }