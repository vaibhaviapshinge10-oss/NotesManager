document.getElementById("loginForm").addEventListener("submit", async function(e) {

    e.preventDefault();
    console.log("Form submitted");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Username or Password");

        }

    } catch (error) {

        console.error(error);
        alert(error);

    }

});