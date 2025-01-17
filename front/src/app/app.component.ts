import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './models/prod';
import { ProdTableComponent } from './components/prod-table/prod-table.component';
import { ProdService } from './service/prod.service'; // Assurez-vous que le chemin est correct
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ProdTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public products: Product[] = [];
  public currentProduct: Product = new Product();
  public isEditing: boolean = false;
  public editingIndex: number | null = null;

  private _myRefreshObservable = new BehaviorSubject<number>(1);

  constructor(private _ProdService: ProdService) {
    this._myRefreshObservable
      .pipe(
        switchMap(() => {
          return this._ProdService.get();
        }),
      )
      .subscribe((value: Product[]) => {
        this.products = value;
      });
  }

  ngOnInit(): void {
    //Salut ! Je suis un bout de code mort inutile :p, à la base je devais faire quelque chose mais je ne sais plus quoi
  }

  onRefreshList(): void {
    this._myRefreshObservable.next(1);
  }

  handleEdit(index: number): void {
    if (!this.isEditing || this.editingIndex === index) {
      this.isEditing = true;
      this.editingIndex = index;
      this.currentProduct = { ...this.products[index] };
    }
  }

  handleCancel(index: number): void {
    if (!this.isEditing) {
      const productToDelete = this.products[index];
      this._ProdService.delete(productToDelete.id).subscribe(() => {
      this.products.splice(index, 1); // Supprimez le produit de la liste
      });
    }
  }

  handleAdd(): void {
    if (!this.isEditing) {
      const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
      this.currentProduct = new Product();
      this.currentProduct.id = newId;  
      this.editingIndex = null;
      this.isEditing = true;  
    }
  }

  saveProduct(): void {
    if (this.editingIndex !== null) {
      // Si vous êtes en mode édition, mettez à jour le produit existant
      this._ProdService.put(this.currentProduct).subscribe(() => {
        if (this.editingIndex !== null) {
          this.products[this.editingIndex] = { ...this.currentProduct };
        }
        this.resetEditingState();
        this.onRefreshList(); // Rafraîchir la liste après l'enregistrement
      });
    } else {
      // Si vous ajoutez un nouveau produit
      this._ProdService.add(this.currentProduct).subscribe((newProduct) => {
        this.products.push(newProduct); // Ajoutez le produit à la liste
        this.resetEditingState();
        this.onRefreshList(); // Rafraîchir la liste après l'enregistrement
      });
    }
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