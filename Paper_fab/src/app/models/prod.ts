export class Product {
  public id: number;
  public name = 'Nouveau produit';
  public texture = '';
  public grammage :number;;
  public couleur = '';

  constructor(id?: number , grammage?: number) {
   
    this.id = id || 0;
    this.grammage = grammage || 0;
  }
}
