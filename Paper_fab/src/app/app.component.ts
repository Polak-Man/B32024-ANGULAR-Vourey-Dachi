import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './models/prod';
import { ProdTableComponent } from './components/prod-table/prod-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ProdTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public products: Product[] = [
    { id: 1, name: 'Papier Recyclé', texture: 'Lisse', grammage: 80, couleur: 'blanc' },
    { id: 2, name: 'Carton Fort', texture: 'Rugueux', grammage: 350, couleur: 'marron' },
  ];

  public currentProduct: Product = new Product();
  public isEditing: boolean = false;
  public editingIndex: number | null = null;

  handleEdit(index: number): void {
    if (!this.isEditing || this.editingIndex === index) {
      this.isEditing = true;
      this.editingIndex = index;
      this.currentProduct = { ...this.products[index] };
    }
  }

  handleCancel(index: number): void {
    if (!this.isEditing) {
      this.products.splice(index, 1);
    }
  }

  handleAdd(): void {
    if (!this.isEditing) {
      const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
      this.currentProduct = new Product();
      this.currentProduct.id = newId;  // Automatically set the new ID
      this.editingIndex = null;
      this.isEditing = true;  // Set isEditing to true to display the form
    }
  }

  saveProduct(): void {
    if (this.editingIndex !== null) {
      this.products[this.editingIndex] = { ...this.currentProduct };
    } else {
      this.products.push({ ...this.currentProduct });
    }
    this.resetEditingState();
  }

  updateProduct(field: keyof Product, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (field === 'grammage' || field === 'id') {
      this.currentProduct[field] = +input.value as any;
    } else {
      this.currentProduct[field] = input.value as any;
    }
  }

  cancelChanges(): void {
    if (this.editingIndex !== null) {
      this.currentProduct = { ...this.products[this.editingIndex] };
    } else {
      this.currentProduct = new Product();
    }
    this.resetEditingState();
  }

  public resetEditingState(): void {
    this.isEditing = false;
    this.editingIndex = null;
    this.currentProduct = new Product();
  }
}
