import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalButtonComponent } from './modalbutton.component';
import { UserService } from '../../services/user.service';

describe('ModalButtonComponent', () => {
  let component: ModalButtonComponent;
  let fixture: ComponentFixture<ModalButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModalButtonComponent, // Add ModalButtonComponent to imports since it's standalone
        ReactiveFormsModule,
        HttpClientTestingModule, // Import HttpClientTestingModule to mock HttpClient
        RouterTestingModule, // Import RouterTestingModule to mock Router
      ],
      providers: [UserService], // Provide UserService
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalButtonComponent);
    component = fixture.componentInstance;

    // Set default input values
    component.button_name = 'Edit Profile';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the modal visibility', () => {
    expect(component.showModal).toBeFalse();
    component.toggleModal();
    expect(component.showModal).toBeTrue();
    component.toggleModal();
    expect(component.showModal).toBeFalse();
  });

  it('should close the modal', () => {
    component.showModal = true;
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  it('should initialize the form with empty values', () => {
    expect(component.updateForm.value).toEqual({
      name: '',
      email: '',
      password: '',
    });
  });

  it('should update form values correctly', () => {
    component.updateForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(component.updateForm.value).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
