import "./App.css";

import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

function App() {
  // State para armazenar os dados recuperados na etapa 1
  const [products, setProducts] = useState([]);

  // States para estruturar os dados que serão enviados na etapa 2
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Etapa 1- Recuperando os dados de uma API/URL
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }
    fetchData();
  }, []);

  // Etapa 2- Enviando dados para uma API/URL
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    // Etapa 3- Carregamento dos dados de forma dinâmica
    const addedProduct = await res.json()
    
    setProducts((prevProducts) => [...prevProducts, addedProduct])

    setName("")
    setPrice("")
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;
