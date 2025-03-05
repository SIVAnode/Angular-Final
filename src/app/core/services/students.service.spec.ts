import { TestBed } from "@angular/core/testing";
import { StudentsService } from "./students.service";
import { of } from "rxjs";

describe('StudentsService', () => {
  let studentsService: StudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentsService],
    });
    studentsService = TestBed.inject(StudentsService);
  });

  it('Debería ser creado el estudiante', () => {
    expect(studentsService).toBeTruthy();
  });

  it('Debería devolver una lista de estudiantes', async () => {
    const students = await studentsService.getStudentsPromise();
    expect(students.length).toBeGreaterThan(0);
    expect(students[0].name).toBeDefined();
  });

  it('Debería devolver una lista de estudiantes (Observable)', (done) => {
    studentsService.getStudentsObservable().subscribe({
      next: (students) => {
        expect(students.length).toBeGreaterThan(0);
        expect(students[0].name).toBeDefined();
        done();
      },
      error: () => {
        fail('Observable no debería emitir un error');
        done();
      }
    });
  });

  it('Debería emitir números crecientes desde getInterval', (done) => {
    const sub = studentsService.getInterval().subscribe((value) => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThanOrEqual(0);
      sub.unsubscribe();
      done();
    });
  });

  it('Debería devolver una lista de roles.', (done) => {
    studentsService.getRoles().subscribe((roles) => {
      expect(roles).toContain('ADMIN');
      expect(roles).toContain('STUDENT');
      expect(roles).toContain('SELLER');
      done();
    });
  });
});