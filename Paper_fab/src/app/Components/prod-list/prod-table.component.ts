import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/prod';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prod-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prod-table.component.html',
  styleUrls: ['./prod-table.component.scss'],
})
export class ProdTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<number>();
  @Output() add = new EventEmitter<void>();
  @Input() isEditing: boolean = false;
  @Input() editingIndex: number | null = null;


  onEdit(index: number) {
    this.edit.emit(index);
  }

  onCancel(index: number) {
    this.cancel.emit(index);
  }

  onAdd() {
    this.add.emit();
  }

  
}
