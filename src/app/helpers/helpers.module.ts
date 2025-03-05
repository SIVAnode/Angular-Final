
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MultiplyDirective } from './directives/multiply.directive';
import { FontSizeDirective } from './directives/font-size.directive';
import { ErrorDeCargaComponent } from './utils/error-de-carga/error-de-carga.component';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FullNamePipe,
    HighlightDirective,
    MultiplyDirective,
    FontSizeDirective,
    ErrorDeCargaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[FullNamePipe,
          HighlightDirective,
           MultiplyDirective,
           FontSizeDirective, 
           MatListModule,
           MatTableModule,
           MatButtonModule,
           MatProgressSpinnerModule,
           MatIconModule,
           MatDialogModule,
           MatInputModule,
           MatFormFieldModule,
           ReactiveFormsModule,
           MatCardModule,
           MatSelectModule
        ]
})
export class HelpersModule { }