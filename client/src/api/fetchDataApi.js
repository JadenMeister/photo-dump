export const fetchCountries = async () => {
    const response = await fetch("http://localhost:8080/admin/uploads");
    if (!response.ok) throw new Error("국가 데이터 가져오기 실패");
    return await response.json();
};

export const fetchUsers = async () => {
    const response = await fetch("http://localhost:8080/admin/users");
    if (!response.ok) throw new Error("유저 데이터 가져오기 실패");
    return await response.json();
};