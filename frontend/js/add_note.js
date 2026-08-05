const token = localStorage.getItem("access");

document.getElementById("noteForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    try {

        const response = await fetch("http://127.0.0.1:8000/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        });

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("Response:", data);

        if (response.ok) {
            alert("Note saved successfully");
            window.location.href = "dashboard.html";
        } else {
            alert(JSON.stringify(data));
        }

    } catch (err) {
        console.error(err);
        alert(err);
    }

});