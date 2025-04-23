import { useState } from "react";
import "./App.css";
import Card from "./Card";
import data from "./assets/data.json";

function App() {
  const [products, setProducts] = useState(data);

  const handleAddToCart = (id: number) => {
    console.log(`Added product with ID ${id} to cart`);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };
  const handleLike = (id: number) => {
    console.log(`Liked product with ID ${id}`);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };
  const handleDislike = (id: number) => {
    console.log(`Disliked product with ID ${id}`);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <header className="px-4 py-2">
        <h1 className=" !text-2xl font-bold">Tinder Shopping</h1>
      </header>
      <main className="p-4 relative flex flex-col">
        <div
          className={`max-w-sm absolute left-0 right-0 top-4 bottom-4 mx-4 overflow-clip rounded-2xl inset-shadow-2xs bg-cover bg-center grid place-items-center`}
        >
          No products left to display
        </div>
        {products.map((productData) => (
          <Card
            key={productData.id}
            {...productData}
            onAddToCart={handleAddToCart}
            onDislike={handleDislike}
            onLike={handleLike}
          />
        ))}
      </main>
      <footer className="bg-gray-200 text-center p-4"></footer>
    </div>
  );
}

export default App;
