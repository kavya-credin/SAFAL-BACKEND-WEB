import Header from "../../components/PageHeader/Header";
import styles from "../../styles/pages/Insurance/insurance.module.css";
import TableComponent from "./Table";
import { useState, useEffect } from "react";
import axios from "axios";
import FullWidthTextField from "../../components/SearchBar/SearchBar";
import { safalBackend } from "../../constants/apiRoutes";
const Insurance = () => {
    const [allData, setAllData] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${safalBackend}/insurance/all-insurance`);
                if (response.data.success) {
                    setAllData(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);
    useEffect(() => {
        const rows = allData.map((Agent) => {
            const obj = {
            }
            obj.name = Agent.name;
            obj.insurancenumber = Agent.insuranceNumber;
            obj.mobile = Agent.mobile;
            obj.id = Agent._id;
            return obj;
        });
        setRows(rows);
    }, [allData])
    const columns = [
        "Name", "InsuranceNumber", "Mobile", "Action"
    ];

    const serachFunction = async (searchStr) => {

        try {
            const response = await axios.post(`${safalBackend}/insurance/search`, {
                "searchQuery": searchStr
            });
            if (response.data.statusCode === 200) {
                setAllData(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={styles.parentDiv}>
            <Header heading="Insurance" />
            <div className={styles.container}>
                <FullWidthTextField placeholder="Search By Phone Number / Insurance Number / Aadhar Number / Name" onSearch={serachFunction} />
                <TableComponent rows={rows} headers={columns} />
            </div>
        </div>
    );
};

export default Insurance;
