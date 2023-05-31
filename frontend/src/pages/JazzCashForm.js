import React, { useState, useRef } from 'react';
import CryptoJS from 'crypto-js';

const JazzCashForm = () => {
    const [formValues, setFormValues] = useState({
        pp_Version: '1.1',
        pp_TxnType: '',
        pp_MerchantID: 'MC55509',
        pp_Language: 'EN',
        pp_SubMerchantID: '',
        pp_Password: 'yt2w0wf498',
        pp_TxnRefNo: 'T20230405021711',
        pp_Amount: '10000',
        pp_DiscountedAmount: '',
        pp_TxnCurrency: 'PKR',
        pp_TxnDateTime: '20230405021711',
        pp_TxnExpiryDateTime: '20230406021711',
        pp_BillReference: 'billRef',
        pp_Description: 'Description of transaction',
        pp_ReturnURL: 'http://127.0.0.1:5500/index.html',
        pp_SecureHash: '4431df7175922160436b66c0ba27023efafaa23be7899ce8bffa2d6d5df682d8',
        ppmpf_1: '1',
        ppmpf_2: '2',
        ppmpf_3: '3',
        ppmpf_4: '4',
        ppmpf_5: '5',
    });

    const [salt, setSalt] = useState('73tx7h8v30');
    const [hashValuesString, setHashValuesString] = useState('');
    const formRef = useRef();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const submitForm = async () => {
        calculateHash();

        const IntegritySalt = salt;
        const hash = CryptoJS.HmacSHA256(hashValuesString, IntegritySalt);

        setFormValues({ ...formValues, pp_SecureHash: hash.toString() });

        console.log("string: " + hashValuesString);
        console.log("hash: " + hash);

        formRef.current.submit();

    };





    const calculateHash = () => {
        let hashString = '';
        const keys = Object.keys(formValues).sort();
        keys.forEach((key) => {
            if (formValues[key] !== '') {
                hashString += formValues[key] + '&';
            }
        });
        hashString = hashString.slice(0, -1);
        setHashValuesString(hashString);
    };

    return (
        <div style={{ background: 'black' }}>
            <h3>JazzCash HTTP POST (Page Redirection) Testing</h3>
            <form ref={formRef}
                method="POST"
                action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform">
                {Object.keys(formValues).map((key) => (
                    <div key={key} className="formFieldWrapper">
                        <label>{key}: </label>
                        <input
                            type="text"
                            name={key}
                            value={formValues[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="button" onClick={submitForm}>
                    Submit
                </button>
            </form>

            <input
                type="hidden"
                name="salt"
                value={salt}
                onChange={(e) => setSalt(e.target.value)}
            />
            <br />
            <br />
            <div className="formFieldWrapper">
                <label>Hash values string: </label>
                <input
                    type="text"
                    id="hashValuesString"
                    value={hashValuesString}
                    readOnly
                />
            </div>
        </div>
    );
};

export default JazzCashForm
