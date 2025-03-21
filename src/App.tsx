import { useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import "./App.css";

const client = generateClient<Schema>();

function App() {
  const { signOut } = useAuthenticator();
  const [searchBarcode, setSearchBarcode] = useState("");
  const [currentBarcode, setCurrentBarcode] = useState<Schema["Barcode"]["type"] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    barcode: "",
    product_name: "",
    kosher_info: "",
    kosher_certificate: "",
    ingredients: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      barcode: "",
      product_name: "",
      kosher_info: "",
      kosher_certificate: "",
      ingredients: ""
    });
    setIsEditing(false);
    setCurrentBarcode(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isEditing && currentBarcode) {
        // Update existing barcode
        const { data, errors } = await client.mutations.updateBarcode({
          barcode: formData.barcode,
          product_name: formData.product_name,
          kosher_info: formData.kosher_info,
          kosher_certificate: formData.kosher_certificate,
          ingredients: formData.ingredients
        });
        
        if (errors) {
          console.error("Update errors:", errors);
        } else {
          console.log("Updated barcode:", data);
          await searchBarcodeByCode(formData.barcode);
        }
      } else {
        // Add new barcode
        const { data, errors } = await client.mutations.addBarcode({
          barcode: formData.barcode,
          product_name: formData.product_name,
          kosher_info: formData.kosher_info,
          kosher_certificate: formData.kosher_certificate,
          ingredients: formData.ingredients
        });
        
        if (errors) {
          console.error("Add errors:", errors);
        } else {
          console.log("Added barcode:", data);
          await searchBarcodeByCode(formData.barcode);
        }
      }
      
      resetForm();
    } catch (error) {
      console.error("Error submitting barcode:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchBarcodeByCode = async (barcode: string) => {
    setSearchError(null);
    setIsLoading(true);
    try {
      const { data, errors } = await client.queries.getBarcode({
        barcode: barcode
      });
      
      if (errors) {
        console.error("Search errors:", errors);
        setCurrentBarcode(null);
        setSearchError("An error occurred while searching. Please try again.");
      } else if (data) {
        console.log("Found barcode:", data);
        setCurrentBarcode(data);
      } else {
        setCurrentBarcode(null);
        setSearchError(`No product found with barcode: ${barcode}`);
      }
    } catch (error) {
      console.error("Error searching barcode:", error);
      setCurrentBarcode(null);
      setSearchError("An error occurred while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchBarcodeByCode(searchBarcode);
  };

  const editBarcode = () => {
    if (currentBarcode) {
      setFormData({
        barcode: currentBarcode.barcode,
        product_name: currentBarcode.product_name,
        kosher_info: currentBarcode.kosher_info || "",
        kosher_certificate: currentBarcode.kosher_certificate || "",
        ingredients: currentBarcode.ingredients || ""
      });
      setIsEditing(true);
    }
  };

  const deleteBarcode = async () => {
    if (currentBarcode) {
      setIsLoading(true);
      try {
        const { data, errors } = await client.mutations.deleteBarcode({
          barcode: currentBarcode.barcode
        });
        
        if (errors) {
          console.error("Delete errors:", errors);
        } else {
          console.log("Deleted barcode:", data);
          resetForm();
          setCurrentBarcode(null);
          setSearchBarcode("");
        }
      } catch (error) {
        console.error("Error deleting barcode:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main>
      <h1>Kosher Product Checker</h1>
      
      {/* Search Form */}
      <div className="search-section">
        <h2>Search Product</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchBarcode}
            onChange={(e) => setSearchBarcode(e.target.value)}
            placeholder="Enter barcode number"
          />
          <button type="submit" disabled={isLoading}>
            Search
            {isLoading && <span className="loading-indicator"></span>}
          </button>
          <button 
            type="button"
            disabled={isLoading}
            onClick={() => {
              if ('mediaDevices' in navigator && 'BarcodeDetector' in window) {
                alert('Barcode scanning is available in your browser but not yet implemented in this app.');
                // Future enhancement: implement barcode scanning
              } else {
                alert('Barcode scanning is not available in your browser.');
              }
            }}
          >
            Scan
          </button>
        </form>
        {searchError && (
          <div className="search-error">
            {searchError}
          </div>
        )}
      </div>

      {/* Display Search Results */}
      {currentBarcode && (
        <div className="result-section">
          <h2>Product Information</h2>
          <div className="barcode-card">
            <p><strong>Barcode:</strong> {currentBarcode.barcode}</p>
            <p><strong>Product Name:</strong> {currentBarcode.product_name}</p>
            <p><strong>Kosher Info:</strong> {currentBarcode.kosher_info || "N/A"}</p>
            <p><strong>Kosher Certificate:</strong> {currentBarcode.kosher_certificate || "N/A"}</p>
            <p><strong>Ingredients:</strong> {currentBarcode.ingredients || "N/A"}</p>
            
            <div className="button-group">
              <button onClick={editBarcode} disabled={isLoading}>Edit</button>
              <button onClick={deleteBarcode} disabled={isLoading}>
                Delete
                {isLoading && <span className="loading-indicator"></span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="form-section">
        <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Barcode</label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              required
              disabled={isEditing}
            />
          </div>
          
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Kosher Info</label>
            <input
              type="text"
              name="kosher_info"
              value={formData.kosher_info}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Kosher Certificate</label>
            <input
              type="text"
              name="kosher_certificate"
              value={formData.kosher_certificate}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={isLoading}>
              {isEditing ? "Update" : "Add"}
              {isLoading && <span className="loading-indicator"></span>}
            </button>
            {isEditing && <button type="button" onClick={resetForm} disabled={isLoading}>Cancel</button>}
          </div>
        </form>
      </div>
      
      <button onClick={signOut} className="sign-out-button">Sign out</button>
    </main>
  );
}

export default App;