import React, { useState } from "react";
import axios from "axios";
import "../scss/form.scss"
function EasyPaisaForm() {
    const [orderId, setOrderId] = useState("");
    const [storeId, setStoreId] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [mobileAccountNo, setMobileAccountNo] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            signature: "ilupel",
            request: {
                orderId,
                storeId,
                transactionAmount,
                transactionType,
                mobileAccountNo,
                emailAddress,
            },
        };
        const accessToken = "REPLACE_WITH_ACCESS_TOKEN";
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Credentials: "REPLACE_THIS_VALUE",
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        try {
            const response = await axios.post(
                "https://api.eu-de.apiconnect.appdomain.cloud/easypaisaapigw-telenorbankpk-tmbdev/dev-catalog/initiate-ma-transaction",
                requestBody,
                { headers }
            );
            console.log(response.data);
            // TODO: handle successful response
        } catch (error) {
            console.error(error);
            // TODO: handle error response
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: 'black', padding: '20px' }}>
            {/* <label>
                Order ID:
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
            </label>
            <br />
            <label>
                Store ID:
                <input
                    type="text"
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                />
            </label> */}
            {/* <br /> */}
            <label>
                Transaction Amount:
                <input
                    type="text"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                />
            </label>
            <br />
            <label>
                Transaction Type:
                <input
                    type="text"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                />
            </label>
            <br />
            <label>
                Mobile Account Number:
                <input
                    type="text"
                    value={mobileAccountNo}
                    onChange={(e) => setMobileAccountNo(e.target.value)}
                />
            </label>
            <br />
            <label>
                Email Address:
                <input
                    type="text"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Initiate Transaction</button>
        </form>
    );
}
export default EasyPaisaForm;
