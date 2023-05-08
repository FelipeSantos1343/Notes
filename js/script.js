const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = document.querySelector("header p"),
closeIcon = document.querySelector("header i"),
titleTag = document.querySelector("input"),
descTag = document.querySelector("textarea"),
addBtn = document.querySelector("button")

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("noteStorage") || "[]")
let isUpdate = false, updateId;


addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel)return;
    notes.splice(noteId, 1);
    localStorage.setItem("noteStorage", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, description){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    addBtn.innerText = "Update Note";
    popupTitle.innerHTML = "Update a Note"
    console.log(noteId, title, description);
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dateObj = new Date();
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day} ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }

        notes.push(noteInfo);
        localStorage.setItem("noteStorage", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }

});