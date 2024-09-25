import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const CardCancelReturn = () => {
  const [result, setResult] = useState({
    RESULT_CODE: "",
    RESULT_MSG: "",
    DRESULT_CODE: "",
    DRESULT_MSG: "",
    PAY_METHOD: "",
    TID: "",
    VAN_RECV_KEY: "",
    CANCEL_AMT: "",
    RESERVED01: "",
    RESERVED02: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append(
          "MID",
          new URLSearchParams(window.location.search).get("MID")
        );
        formData.append(
          "PAY_METHOD",
          new URLSearchParams(window.location.search).get("PAY_METHOD")
        );
        formData.append(
          "TID",
          new URLSearchParams(window.location.search).get("TID")
        );
        formData.append(
          "CANCEL_AMT",
          new URLSearchParams(window.location.search).get("CANCEL_AMT")
        );
        formData.append(
          "RESERVED01",
          new URLSearchParams(window.location.search).get("RESERVED01")
        );
        formData.append(
          "RESERVED02",
          new URLSearchParams(window.location.search).get("RESERVED02")
        );

        const message =
          formData.get("TID") +
          formData.get("MID") +
          formData.get("CANCEL_AMT");
        const secretKey = "1123";
        const hmac = CryptoJS.HmacSHA256(message, secretKey).toString(
          CryptoJS.enc.Base64
        );

        const url = `https://dev-epay.kovanpay.com/api/${formData.get(
          "PAY_METHOD"
        )}/approv/cancel`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TID: formData.get("TID"),
            MID: formData.get("MID"),
            PAY_METHOD: formData.get("PAY_METHOD"),
            CANCEL_AMT: formData.get("CANCEL_AMT"),
            RESERVED01: formData.get("RESERVED01"),
            RESERVED02: formData.get("RESERVED02"),
            CHECKHASH: hmac,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const resultData = await response.json();
        setResult(resultData);
      } catch (error) {
        setError("데이터를 가져오는 데 실패했습니다.");
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <h1>승인응답</h1>
      <table>
        <tbody>
          <tr>
            <td>결과코드(가맹점)</td>
            <td>
              <input type="text" readOnly value={result.RESULT_CODE} />
            </td>
          </tr>
          <tr>
            <td>결과메시지(가맹점)</td>
            <td>
              <input type="text" readOnly value={result.RESULT_MSG} />
            </td>
          </tr>
          <tr>
            <td>결과코드(사용자)</td>
            <td>
              <input type="text" readOnly value={result.DRESULT_CODE} />
            </td>
          </tr>
          <tr>
            <td>결과메시지(사용자)</td>
            <td>
              <input type="text" readOnly value={result.DRESULT_MSG} />
            </td>
          </tr>
          <tr>
            <td>결제수단</td>
            <td>
              <input type="text" readOnly value={result.PAY_METHOD} />
            </td>
          </tr>
          <tr>
            <td>거래번호</td>
            <td>
              <input type="text" readOnly value={result.TID} />
            </td>
          </tr>
          <tr>
            <td>VAN거래고유키</td>
            <td>
              <input type="text" readOnly value={result.VAN_RECV_KEY} />
            </td>
          </tr>
          <tr>
            <td>취소금액</td>
            <td>
              <input type="text" readOnly value={result.CANCEL_AMT} />
            </td>
          </tr>
          <tr>
            <td>예약필드1</td>
            <td>
              <input type="text" readOnly value={result.RESERVED01} />
            </td>
          </tr>
          <tr>
            <td>예약필드2</td>
            <td>
              <input type="text" readOnly value={result.RESERVED02} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CardCancelReturn;
