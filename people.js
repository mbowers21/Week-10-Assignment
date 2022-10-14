class Member {
    constructor(name, color) {
        this.name = name;
        this.color = color; 
    }
}

class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name; 
        this.members = []; 
    }

    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1); 
    }
}

let people = []; 
let personId = 0; 

onClick('new-person', () => {
    people.push(new Person(personId++, getValue('new-person-name')));
    drawDOM();
})

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element; 
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM () {
    let peopleDiv = document.getElementById('people');
    clearElement(peopleDiv); 
    for (person of people) {
        let table = createPeopleTable(person); 
        let title = document.createElement('h2'); 
        title.innerHTML = person.name; 
        title.appendChild(createDeletePersonButton(person)); 
        peopleDiv.appendChild(title); 
        peopleDiv.appendChild(table);
        for (member of person.members) {
            createMemberRow(person, table, member); 
        }
    }
}

function createMemberRow(person, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.color; 
    let actions = row.insertCell(2); 
    actions.appendChild(createDeleteRowButton(person, member));
}

function createDeleteRowButton(person, member) {
    let btn = document.createElement('button'); 
    btn.className = 'btn btn-primary'; 
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = person.members.indexOf(member); 
        person.members.splice(index, 1);
        drawDOM(); 
    };
    return btn;
}

function createDeletePersonButton(person) {
    let btn = document.createElement('button'); 
    btn.className = 'btn btn-primary'; 
    btn.innerHTML = 'Delete Color Palette';
    btn.onclick = () => {
        let index = people.indexOf(person);
        people.splice(index, 1); 
        drawDOM(); 
    };
    return btn;
}

function createNewMemberButton(person) {
    let btn = document.createElement('button'); 
    btn.className = 'btn btn-primary'; 
    btn.innerHTML = 'Create'; 
    btn.onclick = () => {
        person.members.push(new Member(getValue(`name-input-${person.id}`), getValue(`color-input-${person.id}`)));
        drawDOM(); 
    };
    return btn;
}

function createPeopleTable(person) {
    let table = document.createElement('table'); 
    table.setAttribute('class', 'table table-dark table-striped'); 
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th'); 
    let colorColumn = document.createElement('th');
    nameColumn.innerHTML = 'Color Code'; 
    colorColumn.innerHTML = 'Color'; 
    row.appendChild(nameColumn); 
    row.appendChild(colorColumn); 
    let formRow = table.insertRow(1); 
    let nameTh = document.createElement('th'); 
    let colorTh = document.createElement('th');
    let createTh = document.createElement('th'); 
    let nameInput = document.createElement('input'); 
    nameInput.setAttribute('id', `name-input-${person.id}`);
    nameInput.setAttribute('type', 'text'); 
    nameInput.setAttribute('class', 'form-control');
    let colorInput = document.createElement('input'); 
    colorInput.setAttribute('id', `color-input-${person.id}`);
    colorInput.setAttribute('type', 'text'); 
    colorInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(person); 
    nameTh.appendChild(nameInput);
    colorTh.appendChild(colorInput);
    createTh.appendChild(newMemberButton); 
    formRow.appendChild(nameTh);
    formRow.appendChild(colorTh);
    formRow.appendChild(createTh); 
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


