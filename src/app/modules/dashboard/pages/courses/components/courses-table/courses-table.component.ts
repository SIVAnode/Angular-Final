import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { AuthService } from '../../../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-courses-table',
    standalone: false,

    templateUrl: './courses-table.component.html',
    styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
    displayedColumns = ['id', "name", "teacher", "time", "actions"];
    isAdmin$: Observable<boolean>;

    @Input()
    dataSource: Course[] = [];


    @Output()
    delete = new EventEmitter<string>()


    @Output()
    edit = new EventEmitter<Course>()


    constructor(private authService: AuthService) {
        this.isAdmin$ = this.authService.isAdmin$;
    }
}