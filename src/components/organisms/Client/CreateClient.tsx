import React, { useState, useEffect } from "react";

const CreateClient: React.FC = () => {
    const [identificationType, setIdentificationType] = useState<String>("");
    const [identification, setIdentification] = useState<String>("");
    const [lastname, setLastname] = useState<String>("");
    const [firstname, setFirstname] = useState<String>("");
    const [fullname, setFullname] = useState<String>("");
    const [status, setStatus] = useState<String>("");
    const [email, setEmail] = useState<String>("");
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [gender, setGender] = useState<String>("");
    const [career, setCareer] = useState<String>("");
    const [companyName, setCompanyName] = useState<String>("");
    const [companyType, setCompanyType] = useState<String>("");
    const [createDateCompany, setCreateDateCompany] = useState<Date>(new Date());
    const [appLegalRepresent, setAppLegalRepresent] = useState<String>("");
    const [articlesAssociatedDoc, setArticlesAssociatedDoc] = useState<String>("");
    const [basicServicesDocument, setBasicServicesDocument] = useState<String>("");
    const [fingerPrint, setFingerPrint] = useState<String>("");
    const [incomeTaxDocument, setIncomeTaxDocument] = useState<String>("");
    const [lastStatusDate, setLastStatusDate] = useState<Date>(new Date());
    const [maritalStatus, setMaritalStatus] = useState<String>("");
    const [monthlyAvgIncome, setMonthlyAvgIncome] = useState<String>("");
    const [nationality, setNationality] = useState<String>("");
    const [signature, setSignature] = useState<String>("");
    const [taxPaymentPlace, setTaxPaymentPlace] = useState<String>("");
    const [tinDocument, setTinDocument] = useState<String>("");
    const [workStatus, setWorkStatus] = useState<String>("");
    const [creationDate, setCreationDate] = useState<Date>(new Date());
    const [relationship, setRelationship] = useState<String>("");
    const [reference, setReference] = useState<String>("");
    const [phone, setPhone] = useState<String>("");
    const [address, setAddress] = useState<String>("");
    const [segment, setSegment] = useState<String>("");
    const [user, setUser] = useState<String>("");

    const handelSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    identificationType,
                    identification,
                    lastname,
                    firstname,
                    fullname,
                    status,
                    email,
                    birthDate,
                    gender,
                    career,
                    companyName,
                    companyType,
                    createDateCompany,
                    appLegalRepresent,
                    articlesAssociatedDoc,
                    basicServicesDocument,
                    fingerPrint,
                    incomeTaxDocument,
                    lastStatusDate,
                    maritalStatus,
                    monthlyAvgIncome,
                    nationality,
                    signature,
                    taxPaymentPlace,
                    tinDocument,
                    workStatus,
                    creationDate,
                    relationship,
                    reference,
                    phone,
                    address,
                    segment,
                    user,
                }),
                if (response.ok) {
                    throw new Error(response.statusText);
                }
                fetchSegments();
                alert("Client created successfully");
            } catch (error) {
                console.log(error);
            }
    };

}