import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SimplePayRequest from "./simplepay/SimplePayRequest";
import PaymentResult from "./simplepay/PaymentResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimplePayRequest />} />
        <Route path="/payment/result" element={<PaymentResultContainer />} />
      </Routes>
    </Router>
  );
};

const PaymentResultContainer = () => {
  const [resultData, setResultData] = useState(null);
  const [orderNo, setOrderNo] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderNo = params.get("ORDERNO");
    setOrderNo(orderNo);

    console.log("ORDERNO from URL:", orderNo);

    if (orderNo) {
      fetch("http://localhost:3000/payment/result", {
        // 수정된 포트
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ORDERNO: orderNo,
        }),
      })
        .then((response) => {
          console.log("Response status:", response.status);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setResultData(data))
        .catch((error) =>
          console.error("Error fetching payment result:", error)
        );
    }
  }, [orderNo]);

  return resultData ? (
    <PaymentResult {...resultData} />
  ) : (
    <p>결제 결과를 불러오는 중입니다...</p>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import MainPage from "./testComponents/MainPage";
// import PaymentRequest from "./PaymentRequest";
// import CardCancelRequest from "./CardCancelRequest";
// import CardCancelReturn from "./CardCancelReturn";
// import SimplePayRequest from "./SimplePayRequest";
// import SimplePayReturn from "./SimplePayReturn";

// const App = () => (
//   <Router>
//     <Switch>
//       <Route path="/" exact component={MainPage} />
//       <Route path="/payment-request" component={PaymentRequest} />
//       <Route path="/card-cancel-request" component={CardCancelRequest} />
//       <Route path="/card-cancel-return" component={CardCancelReturn} />
//       <Route path="/simplepay-request" component={SimplePayRequest} />
//       <Route path="/simplepay-return" component={SimplePayReturn} />
//     </Switch>
//   </Router>
// );

// export default App;

// App.js
