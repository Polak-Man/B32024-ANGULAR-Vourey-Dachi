import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdTableComponent } from './prod-table.component';
import { CommonModule } from '@angular/common';

describe('ProdTableComponent', () => {
  let component: ProdTableComponent;
  let fixture: ComponentFixture<ProdTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ProdTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdTableComponent);
    component = fixture.componentInstance;
    component.products = [
      { id: 1, name: 'Papier Recyclé', texture: 'Lisse', grammage: 80, couleur: 'blanc' },
      { id: 2, name: 'Carton Fort', texture: 'Rugueux', grammage: 350, couleur: 'marron' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event when onEdit is called', () => {
    spyOn(component.edit, 'emit');
    component.onEdit(1);
    expect(component.edit.emit).toHaveBeenCalledWith(1);
  });

  it('should emit cancel event when onCancel is called', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel(1);
    expect(component.cancel.emit).toHaveBeenCalledWith(1);
  });

  it('should emit add event when onAdd is called', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalled();
  });

  it('should display products in the table', () => {
    const rows = fixture.nativeElement.querySelectorAll('table tr');
    expect(rows.length).toBe(3); // 1 header + 2 product rows
    expect(rows[1].textContent).toContain('Papier Recyclé');
    expect(rows[2].textContent).toContain('Carton Fort');
  });

  it('should disable edit and delete buttons when isEditing is true and editingIndex does not match', () => {
    component.isEditing = true;
    component.editingIndex = 0;
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[2].disabled).toBeTrue(); // Delete button for the second product
    expect(buttons[1].disabled).toBeFalse(); // Edit button for the first product
  });
});
