import { PropTypes } from "prop-types";
import { useContext, useState } from "react";
import { SiteContext } from "../../context/SiteContext";
import Report from "../Report/Report";
import requests from "../../assets/consts/request";

const Help = ({ list, handlerList }) => {
  const site = useContext(SiteContext);
  const [handlerReport, setHandlerReport] = useState(false);

  const reportPost = () => {
    fetch("http://localhost:3005/user/historyd", {
      ...requests.postAppJson,
    });
  };

  return (
    list.help?.display && (
      <>
        <li onClick={() => setHandlerReport(() => !handlerReport)}>report</li>
        {handlerReport && <Report />}
        <li>
          <div>
            <button data-name={"site"} onClick={(e) => handlerList({ e })}>
              site
            </button>
            {list.site && (
              <>
                {list.site.display && (
                  <div className="display--flex  list">
                    <button
                      data-name={"siteHistory"}
                      onClick={(e) => handlerList({ e })}
                    >
                      history
                    </button>
                    {list.siteHistory?.display && (
                      <button onClick={reportPost}>Delete History</button>
                    )}
                    <button
                      data-name={"siteFilterAdult"}
                      onClick={(e) => handlerList({ e })}
                    >
                      filter adult
                    </button>
                    {list.siteFilterAdult?.display && <button>Yes/No</button>}
                    <button
                      data-name={"siteUbication"}
                      onClick={(e) =>
                        handlerList({
                          e,
                          url: `http://localhost:3005/site/sites`,
                        })
                      }
                    >
                      ubication
                    </button>
                    {list.siteUbication && (
                      <>
                        {list.siteUbication.data &&
                          !list.siteUbication.loading &&
                          list.siteUbication.display &&
                          list.siteUbication.data.map((el) => (
                            <p
                              style={{
                                color:
                                  site.country === el.id ||
                                  (site.country === "" && el.id === "MLA")
                                    ? "white"
                                    : "black",
                              }}
                              key={el.id}
                              onClick={() => site.handlerCountry(el.id)}
                            >
                              {el.name}
                            </p>
                          ))}
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </li>
      </>
    )
  );
};

Help.propTypes = {
  list: PropTypes.object,
  handlerList: PropTypes.func,
};

export default Help;
