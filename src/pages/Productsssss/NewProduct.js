import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);  // Initialize to 0

  const limit = 12;  // Number of products per page

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const skip = (currentPage - 1) * limit;
      const categoryFilter = selectedCategory ? `&category=${selectedCategory}` : '';
      try {
        const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}${categoryFilter}`);
        setProducts(response.products);  // Correctly set the products
        setTotalProducts(response.total);  // Correctly set the total number of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory, currentPage]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');  // Fetch all products
        const products = response.products;

        // Extract unique categories by mapping over the products
        const uniqueCategories = [...new Set(products.map(product => product.category))];

        // Set the unique categories to the state
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);  // Reset page to 1 when category changes
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProducts / limit);  // Calculate total pages
  console.log("total",totalPages)

  return (
    <div className="container">
      <h1>Product List</h1>

      {/* Category Filter */}
      <div className="filter-section">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Section */}
      <div className="products">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Placeholder image if the thumbnail is missing */}
              <img
                src={product.thumbnail || 'https://via.placeholder.com/150'}
                alt={product.title}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.description.slice(0, 100)}...</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Rating:</strong> {product.rating} / 5</p>
                <p><strong>Stock:</strong> {product.stock} left</p>
                <button className="details-btn">View Details</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (  // Only show pagination if more than 1 page
        <div className="pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={currentPage === page + 1 ? 'active' : ''}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewProduct;
