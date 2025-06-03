// ! for ADMIN

// 총 나라 수 카운트 요청
export const fetchCountryCount = async () =>{
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/country-count`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    if(!res.ok) throw new Error("국가 업로드 카운트 가져오기 실패");
    return await res.json();
}


// 유저별 사진 가져오기

export const fetchUserEachPhoto = async (userId) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/each-user-photo/${userId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!res.ok) {
        console.error("유저 사진 가져오기 실패", res);
        throw new Error("유저 사진 가져오기 실패");

    }

    return await res.json();
}


// 나라 리스트 요청
export const fetchCountries = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/country-uploads`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!res.ok) throw new Error("국가 데이터 가져오기 실패");

    return await res.json();
};


// 유저 조회 요청
export const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!res.ok) throw new Error("유저 데이터 가져오기 실패");
    return await res.json();
};


// 유저 삭제 요청
export const fetchDeleteUser = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        },
        credentials: "include",
    } );
    if (!res.ok) throw new Error("유저 삭제 실패");
    return await res.json();
}

// 총 업로드 통계 요청
export const fetchTotalCount = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/total-uploads`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return await res.json();
}


//! FOR USER

// 업로드 요청
export const fetchUploads = async ({file,country_name, travelDate}) => {

    console.log("업로드 요청", {file, country_name, travelDate});

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("country_name", country_name);
    formData.append("travel_date", travelDate);

    // 디버깅을 위한 콘솔 로그


    for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

    return  await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
    })
}


// 유저 업로드 카운트요청

export const fetchUserUploadCount = async ()=>{
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/upload-count`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    if (!res.ok) throw new Error("업로드 카운트 가져오기 실패");
    return await res.json();
}

// 유저 업로드 국가 카운트 요청
export const fetchUserUploadsCountry = async ()=>{
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/upload-country`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })

    if (!res.ok) throw new Error("업로드 카운트 가져오기 실패");
    return await res.json();

}

// 유저 업로드 사진 가져오기 요청
export const fetchUserPhotos = async ()=>{
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/upload-photos`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    if (!res.ok) throw new Error("사진 가져오기 실패");
    return await res.json();
}

export const fetchUserPhotoDelete = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload/delete-photos`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
        credentials: "include",
    })
    if (!res.ok) throw new Error("사진 삭제 실패");
    return await res.json();
}



