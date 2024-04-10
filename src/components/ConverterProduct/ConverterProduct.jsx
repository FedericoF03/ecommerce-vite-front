import { useFetch } from "../../hooks/useFetch";
import usePagination from "../../hooks/usePagination";
import Cards from "../Cards/Cards";

const ConverterProduct = ({ item }) => {
  const { pagination } = usePagination();
  const { data } = useFetch({
    url: `http://localhost:3005/products/item/questions?item=${item.id}`,
    obj: {
      credentials: "include",
      headers: {
        "Content-Type": "x-www-form-urlencoded",
      },
    },
  });

  if (!data.loading) return <p>cargando...</p>;
  if (data.error) return <p>Falla</p>;

  return data.result.map(({ body }) => {
    const dataDB = item.items.find((el) => el.item_id === body.id);
    return <Cards key={body.id} item={{ ...body, ...dataDB }} />;
  });
};

export default ConverterProduct;
