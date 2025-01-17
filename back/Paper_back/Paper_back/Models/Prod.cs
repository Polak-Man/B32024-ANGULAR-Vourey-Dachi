namespace Paper_back.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "Nouveau produit"; // Valeur par défaut
        public string Texture { get; set; } = string.Empty; // Valeur par défaut
        public int Grammage { get; set; }
        public string Couleur { get; set; } = string.Empty; // Valeur par défaut
    }
}