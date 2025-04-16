export function uploadImage(selectedCountry, imageFile) {
    const formData = new FormData();
    formData.append("country", selectedCountry);
    formData.append("image", imageFile);}


await fetch("/api/upload",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
})