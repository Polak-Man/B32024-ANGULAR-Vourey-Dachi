import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProdTableComponent } from './components/prod-table/prod-table.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ProdTableComponent],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize products correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.products.length).toBe(2);
    expect(app.products[0].name).toBe('Papier Recyclé ');
  });

  it('should handle editing a product', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.handleEdit(0);
    expect(app.isEditing).toBeTrue();
    expect(app.editingIndex).toBe(0);
    expect(app.currentProduct.name).toBe('Papier Recyclé ');
  });

  it('should handle adding a new product', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.handleAdd();
    expect(app.isEditing).toBeTrue();
    expect(app.currentProduct.id).toBe(3); // Next ID
    expect(app.currentProduct.name).toBe('Nouveau produit');
  });

  it('should save a new product', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.handleAdd();
    app.currentProduct.name = 'New Product';
    app.saveProduct();
    expect(app.products.length).toBe(3);
    expect(app.products[2].name).toBe('New Product');
  });

  it('should cancel changes and reset the form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.handleAdd();
    app.cancelChanges();
    expect(app.isEditing).toBeFalse();
    expect(app.currentProduct.name).toBe('Nouveau produit');
  });
});

