export class Product {
  public id: number;
  public name = 'Nouveau produit';
  public texture = '';
  public grammage = 0;
  public couleur = '';

  constructor(id?: number) {
   
    this.id = id || 0; 
  }
}
