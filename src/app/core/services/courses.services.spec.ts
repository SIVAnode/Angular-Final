import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './courses.service';
import { environment } from '../../../environments/environment.development';
import { Course } from '../../modules/dashboard/pages/courses/models';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear un Curso', () => {
    expect(service).toBeTruthy();
  });

  it('Debe mostrar detalles del Curso', () => {
    const mockCourse: Course = { id: '123', name: 'Test Course', teacher: 'John Doe', time: '10:00 AM' };
    
    service.getCourseDetail('123').subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });
    
    const req = httpMock.expectOne(`${environment.baseApiUrl}/courses/123?_embed=teachers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('Se debe obtener la lista de Cursos con el encabezado de autorización', () => {
    const mockCourses: Course[] = [
      { id: '1', name: 'Course 1', teacher: 'Teacher 1', time: '9:00 AM' },
      { id: '2', name: 'Course 2', teacher: 'Teacher 2', time: '10:00 AM' }
    ];
    
    localStorage.setItem('access_token', 'test-token');
    
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });
    
    const req = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('test-token');
    req.flush(mockCourses);
  });

  it('Debería agregar un nuevo Curso y devolver la lista actualizada', () => {
    const newCourse = { name: 'New Course', teacher: 'New Teacher', time: '11:00 AM' };
    const mockUpdatedCourses: Course[] = [
      { id: '1', name: 'Course 1', teacher: 'Teacher 1', time: '9:00 AM' },
      { id: '2', name: 'Course 2', teacher: 'Teacher 2', time: '10:00 AM' },
      { id: '3', ...newCourse }
    ];

    service.addCourse(newCourse).subscribe((courses) => {
      expect(courses.length).toBe(3);
      expect(courses).toEqual(mockUpdatedCourses);
    });

    const reqPost = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
    expect(reqPost.request.method).toBe('POST');
    reqPost.flush({ id: '3', ...newCourse });

    const reqGet = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
    expect(reqGet.request.method).toBe('GET');
    reqGet.flush(mockUpdatedCourses);
  });

  it('Debería actualizar un Curso y devolver la lista actualizada.', () => {
    const updatedCourse = { name: 'Updated Course' };
    const mockUpdatedCourses: Course[] = [
      { id: '123', name: 'Updated Course', teacher: 'Teacher', time: '10:00 AM' }
    ];

    service.updateCourseById('123', updatedCourse).subscribe((courses) => {
      expect(courses).toEqual(mockUpdatedCourses);
    });

    const reqPatch = httpMock.expectOne(`${environment.baseApiUrl}/courses/123`);
    expect(reqPatch.request.method).toBe('PATCH');
    reqPatch.flush({ id: '123', ...updatedCourse });

    const reqGet = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
    expect(reqGet.request.method).toBe('GET');
    reqGet.flush(mockUpdatedCourses);
  });

  it('Debería eliminar un Curso y devolver la lista actualizada', () => {
    const mockUpdatedCourses: Course[] = [
      { id: '1', name: 'Course 1', teacher: 'Teacher 1', time: '9:00 AM' }
    ];

    service.deleteCourseById('2').subscribe((courses) => {
      expect(courses).toEqual(mockUpdatedCourses);
    });

    const reqDelete = httpMock.expectOne(`${environment.baseApiUrl}/courses/2`);
    expect(reqDelete.request.method).toBe('DELETE');
    reqDelete.flush({});

    const reqGet = httpMock.expectOne(`${environment.baseApiUrl}/courses`);
    expect(reqGet.request.method).toBe('GET');
    reqGet.flush(mockUpdatedCourses);
  });
});