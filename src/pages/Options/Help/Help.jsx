import Report from "../Report/Report";

import useFetchInClick from "../../../hooks/useFetchInClick";

import requestOptions from "../../../consts/requestOptions";
import URLS from "../../../consts/URLS";

import checkInstanceIrequest from "../../../utils/checkInstanceIrequest";

const Help = () => {
  const sites = useFetchInClick({
    url: URLS.sites,
    options: requestOptions.getBodyEncoded,
  });
  return (
    <>
      <li onClick={() => {}}>report</li>
      <Report />
      <li>
        <div>
          <button
            data-name={"site"}
            onClick={(e) => {
              e;
            }}
          >
            site
          </button>
          {
            <>
              {
                <div className="display--flex  list">
                  <button
                    data-name={"siteHistory"}
                    onClick={(e) => {
                      e;
                    }}
                  >
                    history
                  </button>

                  <button onClick={() => {}}>Delete History</button>

                  <button
                    data-name={"siteFilterAdult"}
                    onClick={(e) => {
                      e;
                    }}
                  >
                    filter adult
                  </button>
                  <button>Yes/No</button>
                  <button
                    data-name={"siteUbication"}
                    onClick={() => sites.userMeFetch()}
                  >
                    ubication
                  </button>
                  {
                    <>
                      {checkInstanceIrequest(sites.data) &&
                        sites.data.response.map((el) => (
                          <p
                            style={{
                              color: "white",
                            }}
                            key={el.id}
                            onClick={() => {}}
                          >
                            {el.name}
                          </p>
                        ))}
                    </>
                  }
                </div>
              }
            </>
          }
        </div>
      </li>
    </>
  );
};

Help.propTypes = {
  // list: PropTypes.object,
  // handlerList: PropTypes.func,
};

export default Help;
