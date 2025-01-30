import React, { useState, useEffect } from "react";
import { HeaderBar } from "@dhis2/ui";
import "./HeaderBar.styles.css";
import propTypes from "./HeaderBar.types.js";
import { CustomDataProvider, Provider } from "@dhis2/app-runtime";
import useApi from "../../hooks/useApi";
const createCustomData = ({ title, me, dashboard, modules }) => {
  const headerBarData = {
    "systemSettings/applicationTitle": {
      applicationTitle: title,
    },
    me,
    "action::menu/getModules": {
      modules,
    },
    "me/dashboard": dashboard,
  };
  return headerBarData;
};

const Dhis2HeaderBar = ({ title }) => {
  const { metadataApi } = useApi();
  const [data, setData] = useState(0);
  useEffect(() => {
    // metadataApi.getHeaderBarData().then((json) => {
    //   json.title = title;
    //   setData(json);
    // });
  }, []);
  return (
    <Provider config={{ apiVersion: "", baseUrl: process.env.REACT_APP_BASE_URL }}>
      {/* <CustomDataProvider data={createCustomData(data)}> */}
      <HeaderBar appName={title} />
      {/* </CustomDataProvider> */}
    </Provider>
  );
};

Dhis2HeaderBar.propTypes = propTypes;
export default Dhis2HeaderBar;


// import React, { useState, useEffect } from "react";
// import { HeaderBar } from "@dhis2/ui";
// import { CustomDataProvider, Provider } from "@dhis2/app-runtime";
// import useApi from "../../hooks/useApi";
// import "./HeaderBar.styles.css";
// import propTypes from "./HeaderBar.types.js";

// const createCustomData = ({ title, me, dashboard, modules }) => {
//   const headerBarData = {
//     "systemSettings/applicationTitle": {
//       applicationTitle: title,
//     },
//     me,
//     "action::menu/getModules": {
//       modules,
//     },
//     "me/dashboard": dashboard,
//   };
//   return headerBarData;
// };

// const Dhis2HeaderBar = ({ title }) => {
//   // Always initialize hooks at the top level
//   const { metadataApi } = useApi();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // If you want to fetch data, uncomment this:
//     const fetchHeaderData = async () => {
//       try {
//         const json = await metadataApi.getHeaderBarData();
//         json.title = title;
//         setData(json);
//       } catch (error) {
//         console.error('Error fetching header data:', error);
//       }
//     };
//     fetchHeaderData();
//   }, [metadataApi, title]); // Add proper dependencies

//   return (
//     <Provider config={{ apiVersion: "", baseUrl: process.env.REACT_APP_BASE_URL }}>
//       <HeaderBar appName={title} />
//     </Provider>
//   );
// };

// Dhis2HeaderBar.propTypes = propTypes;
// export default Dhis2HeaderBar;