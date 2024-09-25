import React, { useState } from "react";

const SimplePayRequest = () => {
  const [formData, setFormData] = useState({
    mid: process.env.REACT_APP_MID,
    rUrl: process.env.REACT_APP_RURL,
    rMethod: "POST",
    payType: "CC", // 기본 결제수단을 신용카드로 설정
    buyItemnm: "오이비누",
    buyReqamt: "5000",
    buyItemcd: "oiSoap",
    buyerid: "gildonghong",
    buyernm: "홍길동",
    buyerEmail: "gildong2@naver.com",
    orderno: `${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}${new Date()
      .toISOString()
      .slice(11, 19)
      .replace(/:/g, "")}`,
    orderdt: new Date().toISOString().slice(0, 10).replace(/-/g, ""),
    ordertm: new Date().toISOString().slice(11, 19).replace(/:/g, ""),
    apiKey: process.env.REACT_APP_API_KEY,
    checkHash: "",
    reserved01: "가맹점예약필드 1",
    reserved02: "가맹점예약필드 2",
    returnAppUrl: process.env.REACT_APP_RURL, // 환경 변수로 설정된 URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateHash = async () => {
    const { orderno, orderdt, ordertm, buyReqamt, apiKey } = formData;
    const hashkey = orderno + orderdt + ordertm + buyReqamt;

    // HMAC SHA-256 해시값 생성
    const encoder = new TextEncoder();
    const keyData = encoder.encode(apiKey);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const messageData = encoder.encode(hashkey);
    const signature = await crypto.subtle.sign("HMAC", key, messageData);
    const hashArray = Array.from(new Uint8Array(signature));
    const hashBase64 = btoa(String.fromCharCode(...hashArray));

    setFormData({ ...formData, checkHash: hashBase64 });
  };

  const submitForm = (isMobile) => {
    // 모바일과 웹 브라우저 요청 URL 설정
    const targetUrl = isMobile
      ? "https://dev-epay.kovanpay.com/mobilepage/common/mainFrame.pay"
      : "https://dev-epay.kovanpay.com/paypage/common/mainFrame.pay";

    const form = document.createElement("form");
    form.method = "post";
    form.action = targetUrl;
    form.target = isMobile ? "mobilePop" : "pcPop";

    Object.keys(formData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = formData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);

    // 잠시 대기 후 폼 제출
    setTimeout(() => {
      form.submit();
    }, 100);
  };

  const handleSubmit = async (isMobile) => {
    await calculateHash(); // 해시 값 계산 완료 대기
    submitForm(isMobile); // 폼 제출
  };

  return (
    <div style={{ margin: "auto", width: "410px" }}>
      <div>승인요청 정보</div>
      <table>
        <tbody>
          {/* 각 필드의 입력값을 수정하거나 삭제할 수 있습니다. */}
          <tr>
            <td>상점 ID</td>
            <td>
              <input
                type="text"
                name="mid"
                value={formData.mid}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>return URL</td>
            <td>
              <input
                type="text"
                name="rUrl"
                value={formData.rUrl}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>return Method</td>
            <td>
              <input
                type="text"
                name="rMethod"
                value={formData.rMethod}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>결제수단</td>
            <td>
              <select
                name="payType"
                value={formData.payType}
                onChange={handleChange}
              >
                <option value="CC">신용카드</option>
                <option value="VA">가상계좌</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>상품명</td>
            <td>
              <input
                type="text"
                name="buyItemnm"
                value={formData.buyItemnm}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>상품가격</td>
            <td>
              <input
                type="text"
                name="buyReqamt"
                value={formData.buyReqamt}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>상품코드</td>
            <td>
              <input
                type="text"
                name="buyItemcd"
                value={formData.buyItemcd}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>구매자 ID</td>
            <td>
              <input
                type="text"
                name="buyerid"
                value={formData.buyerid}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>구매자명</td>
            <td>
              <input
                type="text"
                name="buyernm"
                value={formData.buyernm}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>구매자 E-mail</td>
            <td>
              <input
                type="text"
                name="buyerEmail"
                value={formData.buyerEmail}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>주문번호</td>
            <td>
              <input
                type="text"
                name="orderno"
                value={formData.orderno}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>주문일자</td>
            <td>
              <input
                type="text"
                name="orderdt"
                value={formData.orderdt}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>주문시간</td>
            <td>
              <input
                type="text"
                name="ordertm"
                value={formData.ordertm}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>API KEY</td>
            <td>
              <input
                type="text"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Hash Key</td>
            <td>
              <input
                type="text"
                name="checkHash"
                value={formData.checkHash}
                readOnly
              />
            </td>
            <td>
              <button type="button" onClick={calculateHash}>
                Hash Key 생성
              </button>
            </td>
          </tr>
          <tr>
            <td>가맹점예약필드1</td>
            <td>
              <input
                type="text"
                name="reserved01"
                value={formData.reserved01}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>가맹점예약필드2</td>
            <td>
              <input
                type="text"
                name="reserved02"
                value={formData.reserved02}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>App Scheme Uri</td>
            <td>
              <input
                type="text"
                name="returnAppUrl"
                value={formData.returnAppUrl}
                readOnly // 입력 값을 변경할 수 없도록 readOnly로 설정
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          style={{ marginRight: "10px" }}
        >
          PC 결제 요청
        </button>
        <button type="button" onClick={() => handleSubmit(true)}>
          모바일 결제 요청
        </button>
      </div>
    </div>
  );
};

export default SimplePayRequest;
