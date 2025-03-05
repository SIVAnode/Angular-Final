import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { StoreModule } from '@ngrx/store';
import { enrollementFeature } from './store/enrollement.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EnrollementEffects } from './store/enrollement.effects';
import { HelpersModule } from '../../../../helpers/helpers.module';


@NgModule({
  declarations: [
    EnrollmentsComponent
  ],
  imports: [
    CommonModule,
    HelpersModule,
    EnrollmentsRoutingModule,
    StoreModule.forFeature(enrollementFeature),
    EffectsModule.forFeature([EnrollementEffects])
  ]
})
export class EnrollmentsModule { }