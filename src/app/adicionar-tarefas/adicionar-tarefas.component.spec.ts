import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTarefasComponent } from './adicionar-tarefas.component';

describe('AdicionarTarefasComponent', () => {
  let component: AdicionarTarefasComponent;
  let fixture: ComponentFixture<AdicionarTarefasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarTarefasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
