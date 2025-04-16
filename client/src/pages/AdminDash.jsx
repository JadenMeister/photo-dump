
import {useState, useEffect} from "react";

const adminDash = () => {
    const [isSidebarOpen, setSidebarOpen] = React.useState(false)
    const [countries, setCountries] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const allDataFetch = async ()=>{
            try{
                const [countryRes, userRes] = await Promise.all([
                    fetch("/admin/country-uploads"),
                    fetch("/admin/users")
                ]);

                const countryData = await countryRes.json();
                const userData = await userRes.json();

                setCountries(countryData);
                setUserData(userData);


            } catch (err){
                console.error("모든 데이터 가져오기 실패", err);
            }
        }
    }, []);



    return(
        <div className="adminDash">
            <h1>Admin Dashboard</h1>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            </button>
            {isSidebarOpen && (
                <div className="sidebar">
                    <h2>Sidebar</h2>
                    <ul>
                        <li>Dashboard</li>
                        <li>User Management</li>
                        <li>Upload Statistics</li>
                    </ul>
                </div>
            )}
            <div className="user-data">
                <h2>User Data</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>{users}</tbody>
                </table>
            </div>

            <div className="upload-statistics">
                <h2>Upload Statistics by Country</h2>
                {countries.map((country) => (
                    <div key={country.name}>
                        {country.name}: {country.upload_count}
                    </div>
                ))}
            </div>

        </div>
    )












};

export default adminDash;
