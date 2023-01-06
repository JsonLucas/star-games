import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ProductList from "../../components/Products";
import { useProducts } from "../../hooks/useProducts";

export function Favorites() {
//   const { favorites } = useProducts();
  return (
    <main>
      <Header />
      {/* {favorites.isLoading && <Loading />} */}
      {/* {favorites.data && <ProductList products={[]} />} */}
    </main>
  );
}
