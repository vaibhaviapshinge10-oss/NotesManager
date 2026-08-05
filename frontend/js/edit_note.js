const token = localStorage.getItem("access");
const noteId = localStorage.getItem("noteId");

async function loadNote(){

    const response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });

    const note = await response.json();

    document.getElementById("title").value = note.title;
    document.getElementById("content").value = note.content;
}

loadNote();

document.getElementById("noteForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },

        body:JSON.stringify({
            title,
            content
        })

    });

    if(response.ok){
        window.location.href="dashboard.html";
    }else{
        alert("Unable to update note");
    }

});