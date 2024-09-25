import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const PaymentForm = ({ service, storeInfo, config }) => {
  const [paymentData, setPaymentData] = useState({
    mid: process.env.REACT_APP_MID || "",
    rUrl: process.env.REACT_APP_RURL || "",
    rMethod: "POST",
    payGroup: "GEP",
    payType: "CC",
    buyItemnm: "", // 상품명
    buyReqamt: "0", // 상품 가격
    buyItemcd: "", // 상품 코드
    orderno: "", // 주문번호
    orderdt: "", // 주문 일자
    ordertm: "", // 주문 시간
    checkHash: "", // 무결성 검증 Hash 값
    buyerid: "", // 구매자 ID (카카오페이 필수)
    buyernm: "", // 구매자명
    buyerEmail: "", // 구매자 이메일
    reserved01: "", // 가맹점 예약 필드 1
    reserved02: "", // 가맹점 예약 필드 2
    returnAppUrl: "", // 모바일 앱 결제 시 필수
    cardCode: "", // 카드사 코드 (신용카드 결제 시 필수)
    quota: "", // 할부 개월 수 (신용카드 결제 시 선택적)
    token_type: "", // 토큰 수단 (토큰 결제 시 필수)
    token_key: "", // 토큰 키 (토큰 결제 시 필수)
    bankCode: "", // 은행 코드 (가상계좌 결제 시 필수)
    trend: "", // 입금 종료일시 (가상계좌 결제 시 필수)
  });

  useEffect(() => {
    if (service && storeInfo && config && service.price) {
      const price = parseInt(service.price, 10); // Ensure price is an integer
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, ""); // YYYYMMDD
      const formattedTime = currentDate
        .toTimeString()
        .slice(0, 8)
        .replace(/:/g, ""); // HHMMSS

      const updatedData = {
        ...paymentData,
        buyItemnm: service.title || "상품명",
        buyReqamt: price.toString(), // Convert to string if needed
        buyItemcd: getItemCode(service.title), // 상품 코드 결정
        orderno: storeInfo.orderno || "ORDER12345",
        orderdt: storeInfo.orderdt || formattedDate,
        ordertm: storeInfo.ordertm || formattedTime,
        checkHash: generateHash(
          storeInfo.orderno || "ORDER12345",
          storeInfo.orderdt || formattedDate,
          storeInfo.ordertm || formattedTime,
          price,
          process.env.REACT_APP_API_KEY || ""
        ),
        buyerid: storeInfo.buyerid || "buyer123",
        buyernm: storeInfo.buyernm || "홍길동",
        buyerEmail: storeInfo.buyerEmail || "gildong@example.com",
        reserved01: storeInfo.reserved01 || "",
        reserved02: storeInfo.reserved02 || "",
        returnAppUrl: storeInfo.returnAppUrl || "porttest://",
        cardCode: storeInfo.cardCode || "1101", // 기본 카드사 코드 설정
        quota: storeInfo.quota || "00", // 기본 할부 개월 수 설정
        token_type: storeInfo.token_type || "PAY", // 예: REG (정기 결제)
        token_key: storeInfo.token_key || "sampleTokenKey12345", // 실제 토큰 키로 설정
        bankCode: storeInfo.bankCode || "001", // 예: 001 (가상계좌 코드)
        trend:
          storeInfo.trend ||
          new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 19)
            .replace(/T/g, "")
            .replace(/-/g, "")
            .replace(/:/g, "") + "0000", // 3일 후의 종료일시
      };

      console.log("Updated Payment Data:", updatedData); // Check updated data
      setPaymentData(updatedData);
    }
  }, [service, storeInfo, config]);

  const getItemCode = (title) => {
    switch (title) {
      case "1개월":
        return "one";
      case "6개월":
        return "half";
      default:
        return "dozen";
    }
  };

  const generateHash = (orderno, orderdt, ordertm, buyReqamt, apiKey) => {
    const message = `${orderno}${orderdt}${ordertm}${buyReqamt}`;
    const hash = CryptoJS.HmacSHA256(message, apiKey);
    const hashBase64 = CryptoJS.enc.Base64.stringify(hash);
    console.log("Generated Hash:", hashBase64); // Check generated hash
    return hashBase64;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Payment Data:", paymentData); // Check data before submit
    document.getElementById("paymentForm").submit();
  };

  return (
    <div>
      <h1>결제 요청</h1>
      <form
        id="paymentForm"
        action="https://dev-epay.kovanpay.com/paypage/common/mainFrame.pay"
        method="post"
        onSubmit={handleSubmit}
      >
        {Object.keys(paymentData).map((key) => (
          <input key={key} type="hidden" name={key} value={paymentData[key]} />
        ))}
        <button type="submit">결제하기</button>
      </form>
    </div>
  );
};

export default PaymentForm;
