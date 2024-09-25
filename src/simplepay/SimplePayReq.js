import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentResult = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL에 직접 데이터를 추가하는 대신, 클라이언트에서 백엔드로 GET 요청을 보내고, 응답을 받는다
    const fetchData = async () => {
      try {
        // 클라이언트에서 서버로 데이터를 보내는 것이 아니라, 서버에서 결제 결과를 받는 경우에 사용할 수 있음
        const response = await axios.get(
          `${process.env.REACT_APP_RURL}/payment/result`
        );
        setData(response.data);
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <h2>승인응답</h2>
      <table className="returnTable">
        <tbody>
          <tr>
            <td>결과코드(가맹점)</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.RESULT_CODE || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>결과메시지(가맹점)</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.RESULT_MSG || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>결과코드(사용자)</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.DRESULT_CODE || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>결과메시지(사용자)</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.DRESULT_MSG || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>결제수단</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.PAY_METHOD || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>거래번호</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.TID || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>VAN거래고유키(신용카드)</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.VAN_RECV_KEY || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>주문번호</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.ORDERNO || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>예약필드1</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.RESERVED01 || ""}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td>예약필드2</td>
            <td>
              <input
                type="text"
                style={{ width: "500px" }}
                value={data.RESERVED02 || ""}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 신용카드 성공시 */}
      <div style={{ float: "left" }}>
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <span> [ 신용카드 성공시 아래 항목 필수 ]</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="returnTable">
          <tbody>
            <tr>
              <td>승인번호</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.APPROVNO || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>승인일자(YYYYMMDD)</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.APPRODT || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>승인시각(HH24MISS)</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.APPROTM || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>승인금액</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.APPROAMT || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>카드번호</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.CARD_NO || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>발급사코드</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.ISSUE_CODE || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>발급사명</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.ISSUE_NAME || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>매입사코드</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.PURCHASE_CODE || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>매입사명</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.PURCHASE_NAME || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>무이자여부</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.NOINT || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>할부개월수</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.QUOTA_MONTHS || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>신용카드/체크카드</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.CHECKCD || ""}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 가상계좌 성공시 */}
      <div style={{ float: "right", paddingRight: "130px" }}>
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <span> [ 가상계좌 성공시 아래 항목 필수 ]</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="returnTable">
          <tbody>
            <tr>
              <td>입금은행</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.BANK_NM || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>입금계좌번호</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.ACCT_NO || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>입금예정일시</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.TRBEGIN || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>입금완료일시</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.TREND || ""}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>입금예정금액</td>
              <td>
                <input
                  type="text"
                  style={{ width: "500px" }}
                  value={data.BUY_REQAMT || ""}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentResult;
