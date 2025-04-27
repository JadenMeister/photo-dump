export const fetchCountries = async () => {
    const response = await fetch("http://localhost:8080/api/admin/uploads",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) throw new Error("국가 데이터 가져오기 실패");

    return await response.json();
};

export const fetchUsers = async () => {
    const response = await fetch("http://localhost:8080/api/admin/users",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) throw new Error("유저 데이터 가져오기 실패");
    return await response.json();
};