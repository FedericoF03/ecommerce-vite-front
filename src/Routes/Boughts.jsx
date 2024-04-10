import { useContext } from "react";

import Cards from "../components/Cards/Cards";

import { BoughtContext } from "../context/BoughtContext";

// import requests from "../assets/consts/requests";

const Boughts = () => {
  const bought = useContext(BoughtContext);

  // useEffect(() => {
  //   const aborter = new AbortController();
  //   if (
  //     bought.data.status === "authorized" &&
  //     bought.data.result?.orders.length > 0
  //   ) {
  //     setData((antState) => ({ ...antState, aborter }));
  //     bought.data.result.orders.forEach((boughts, i) => {
  //       if (pagination.offset <= i < 3 + pagination.offset) {
  //         (async () => {
  //           try {

  //             // const ids = boughts.items.reduce(
  //             //   (acc, cur, i) =>
  //             //     pagination.offset <= i && i < 3 + pagination.offset
  //             //       ? `${acc},${cur.item_id}`
  //             //       : acc,
  //             //   ""
  //             // );
  //             // const url = `http://localhost:3005/products/item?ids=${ids}`;
  //             // const getData = await fetch(url, {
  //             //   ...requests.getURLencoded,
  //             //   signal: aborter.signal,
  //             // });

  //             if (getData.status > 400) {
  //               const error = new Error(getData.statusText);
  //               error.code = getData.status;
  //               throw error;
  //             }

  //             await getData.json().then((res) => {
  //               if (res.error) {
  //                 const error = new Error(getData.error);
  //                 error.code = getData.status;
  //                 throw error;
  //               }
  //               setData((stateData) => {
  //                 const validation = stateData.result || [];
  //                 if (
  //                   bought.data.result &&
  //                   validation.length < bought.data.result.orders.length
  //                 )
  //                   return {
  //                     result: [
  //                       ...(stateData.result || []),
  //                       {
  //                         orders: res,
  //                         quantityTotal: boughts.quantity_total,
  //                         bookmarked_date: boughts.bookmarked_date,
  //                         id: boughts._id,
  //                       },
  //                     ],
  //                     loading: false,
  //                   };
  //                 else return stateData;
  //               });
  //             });
  //           } catch (error) {
  //             setData((c) => ({
  //               ...c,
  //               loading: false,
  //               error: { code: error.code, msg: error.message },
  //             }));
  //           }
  //         })();
  //       }
  //     });
  //   } else setData((c) => ({ ...c, loading: false }));
  //   return () => aborter.abort();
  // }, [bought.data.status, pagination.offset, bought.data.result]);

  return (
    <div className="conteiner-data-carts">
      {bought.data.result &&
        bought.data.result.orders.map((el, i) => <Cards bought={el} key={i} />)}
    </div>
  );
};

export default Boughts;
