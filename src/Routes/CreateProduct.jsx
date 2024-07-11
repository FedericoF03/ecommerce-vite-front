const CreateProduct = () => {
  // const site = useContext(SiteContext);
  // const { list, handlerList, setList } = useToggles();
  // const arrayList = Object.values(list);
  return (
    <div>
      {/* <p>Product creator</p>
      <button data-name={"categories"} onClick={(e) => handlerList({ e })}>
        Categories
      </button>
      <div>
        {site.data.status === "authorized" &&
          list.categories?.display &&
          site.data.result.map((el) => (
            <p
              key={el.id}
              id="sidebar"
              {...props}
              data-name={el.name}
              onClick={(e) => {
                handlerList({
                  e,
                  url: `http://localhost:3005/site/categories/${el.id}`,
                  config: requests.getURLencoded,
                  attribute: "data-name",
                });
                setList((state) => ({
                  ...state,
                  categories: { display: false },
                }));
              }}
            >
              {el.name}
            </p>
          ))}
        {arrayList.map(
          (el) =>
            el.display &&
            el.data && (
              <Fragment key={uuid()}>
                {el.data.path_from_root &&
                  el.data.path_from_root.map((path) => (
                    <p
                      key={uuid()}
                      data-id={path.id}
                      onClick={(e) => {
                        handlerList({
                          e,
                          url: `http://localhost:3005/site/categories/attributes/${path.id}`,
                          config: requests.getURLencoded,
                          attribute: "data-id",
                        });
                      }}
                    >
                      {path.name}
                    </p>
                  ))}
                {el.data.children_categories &&
                  el.data.children_categories.map((categorie) => (
                    <p
                      data-id={categorie.id}
                      onClick={(e) => {
                        handlerList({
                          e,
                          url: `http://localhost:3005/site/categories/attributes/${categorie.id}`,
                          config: requests.getURLencoded,
                          attribute: "data-id",
                        });
                        setList((state) => ({
                          ...state,
                          categories: { display: false },
                        }));
                      }}
                      key={categorie.id}
                    >
                      {categorie.name}
                    </p>
                  ))}
              </Fragment>
            )
        )}
      </div> */}
    </div>
  );
};

export default CreateProduct;
