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


export const fetchDeleteUser = async (id) => {
    const response = await fetch(`http://localhost:8080/api/admin/users/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        },
        credentials: "include",
    } );
    if (!response.ok) throw new Error("유저 삭제 실패");
    return await response.json();

}

export const fetchUploads = async ({file, userId, country_id, travelDate}) => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("user_id", userId);
    formData.append("country_id", country_id);
    formData.append("travel_date", travelDate);

    return  await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
    })
}