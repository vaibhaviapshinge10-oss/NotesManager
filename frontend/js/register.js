document.getElementById("registerForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        console.log("Status:", response.status);

        const data = await response.json();

        console.log(data);

        if (response.ok) {

            alert("Registration Successful. Please login.");

            window.location.href = "login.html";

        } else {

            alert(JSON.stringify(data));

        }

    } catch (error) {

        console.error(error);
        alert(error);

    }

});
