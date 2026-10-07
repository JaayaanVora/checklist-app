let currentUser =
localStorage.getItem("user") || "";

loadChecklists();

function saveUser() {

    currentUser =
        document.getElementById("userName").value;

    localStorage.setItem(
        "user",
        currentUser
    );

    alert("User Saved");
}

function createChecklist() {

    let name =
      document.getElementById("checklistName").value;

    let checklist = {

        id: Date.now(),
        name: name,
        items: []
    };

    let checklists =
        JSON.parse(
            localStorage.getItem("checklists")
            || "[]"
        );

    checklists.push(checklist);

    localStorage.setItem(
        "checklists",
        JSON.stringify(checklists)
    );

    loadChecklists();
}

function addItem(checklistId) {

    let text =
      prompt("Enter Step Text");

    let checklists =
      JSON.parse(
      localStorage.getItem("checklists") || "[]");

    let checklist =
      checklists.find(
      c => c.id === checklistId);

    checklist.items.push({

        text: text,
        completed: false,
        completedBy: "",
        timestamp: ""
    });

    localStorage.setItem(
      "checklists",
      JSON.stringify(checklists));

    loadChecklists();
}

function toggleItem(
    checklistId,
    itemIndex
) {

    let checklists =
      JSON.parse(
      localStorage.getItem("checklists")
      || "[]");

    let checklist =
      checklists.find(
      c => c.id === checklistId);

    let item =
      checklist.items[itemIndex];

    item.completed =
      !item.completed;

    item.completedBy =
      currentUser;

    item.timestamp =
      new Date().toLocaleString();

    localStorage.setItem(
       "checklists",
       JSON.stringify(checklists));

    loadChecklists();
}

function loadChecklists() {

    let div =
      document.getElementById(
      "checklists");

    if(!div) return;

    div.innerHTML = "";

    let checklists =
      JSON.parse(
      localStorage.getItem("checklists")
      || "[]");

    checklists.forEach(cl => {

        let html = `

        <div class='checklist'>

            <h3>${cl.name}</h3>

            <button onclick='addItem(${cl.id})'>
                Add Step
            </button>

        `;

        cl.items.forEach((item,index)=>{

            html += `

            <div class='item'>

                <input
                type='checkbox'

                ${item.completed ?
                "checked" : ""}

                onchange='toggleItem(
                ${cl.id},
                ${index})'>

                ${item.text}

                <br>

                <small>

                ${item.completedBy}
                ${item.timestamp}

                </small>

            </div>`;
        });

        html += "</div>";

        div.innerHTML += html;

    });
}