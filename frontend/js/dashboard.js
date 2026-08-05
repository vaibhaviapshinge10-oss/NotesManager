const token = localStorage.getItem("access");

if (!token) {
    window.location.href = "login.html";
}

document.getElementById("logoutBtn").onclick = function () {
    localStorage.clear();
    window.location.href = "login.html";
};

document.getElementById("addNoteBtn").onclick = function () {
    window.location.href = "add_note.html";
};

loadNotes();

async function loadNotes() {

    const response = await fetch("http://127.0.0.1:8000/api/notes", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const notes = await response.json();

    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    if (notes.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <p class="mb-0">You don't have any notes yet. Click "Add Note" to create one.</p>
                </div>
            </div>
        `;
        return;
    }

    notes.forEach(note => {

        container.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card note-card">
                    <div class="card-body d-flex flex-column">

                        <h5 class="card-title">${note.title}</h5>

                        <p class="card-text flex-grow-1">${note.content}</p>

                        <div class="d-flex gap-2 mt-2">
                            <button class="btn btn-warning btn-sm" onclick="editNote(${note.id})">
                                Edit
                            </button>

                            <button class="btn btn-danger btn-sm" onclick="deleteNote(${note.id})">
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        `;

    });

}
function editNote(id){
    localStorage.setItem("noteId", id);
    window.location.href = "edit_note.html";
}
async function deleteNote(id) {

    const confirmDelete = confirm("Delete this note?");

    if (!confirmDelete) return;

    const response = await fetch(`http://127.0.0.1:8000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        loadNotes();
    } else {
        alert("Unable to delete note");
    }
}
