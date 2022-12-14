import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ProductList from "../../components/Products";
import { useProducts } from "../../hooks/useProducts";

export default function Home() {
	const { products } = useProducts();
  return (
    <main>
      <Header />
	  {products.isLoading && <Loading />}
	  {products.data && <ProductList products={products.data} />}
    </main>
  );
}
