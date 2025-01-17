using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Paper_back.Models;

namespace Ws1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private static List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "Produit 1", Texture = "Texture 1", Grammage = 100, Couleur = "Rouge" },
            new Product { Id = 2, Name = "Produit 2", Texture = "Texture 2", Grammage = 200, Couleur = "Bleu" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> CreateProduct(Product product)
        {
            if (!products.Any())
            {
                product.Id = 1; // Si la liste est vide, attribuer l'ID 1
            }
            else
            {
                product.Id = products.Max(p => p.Id) + 1; // Sinon, attribuez un nouvel ID
            }
            products.Add(product);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateProduct(int id, Product product)
        {
            var existingProduct = products.FirstOrDefault(p => p.Id == id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.Name = product.Name;
            existingProduct.Texture = product.Texture;
            existingProduct.Grammage = product.Grammage;
            existingProduct.Couleur = product.Couleur;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            products.Remove(product);
            return NoContent();
        }
    }
}