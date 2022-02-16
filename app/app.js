const api = 'http://localhost:3000/users'

function start() {
    getUsers(renderUsers)

    handleCreateForm()
}
start()

function getUsers(callBack) {
    fetch(api)
        .then(res => res.json())
        .then(callBack)
}

function renderUsers(users) {
    const filterTable = document.getElementById("filterTable")
    const tableListUser = document.getElementById("tbody")

    const htmls = users.map(user => {
        return `
        <tr class="user-item-${user.id}">
            <td class="name-${user.id}">${user.name}</td>
            <td class="hide birthday-${user.id}">${user.birthday}</td>
            <td class="hide gender-${user.id}">${user.gender}</td>
            <td class="hide createAdt-${user.id}">${user.createAdt}</td>
            <td class="hide role-${user.id}">${user.role}</td>
            <td class="hide">
                <span onclick="handleDeleteUser(${user.id})"><i class="fas fa-eraser"></i></span> /
                <span onclick="handleEditUser(${user.id})"><i class="fas fa-edit"></i></span>
            </td>
            
        </tr>
        `
    })
    filterTable.innerHTML = htmls.join('')
    tableListUser.innerHTML = htmls.join('')
}

function createUser(data, callBack) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(api, options)
        .then(res => res.json())
        .then(callBack)
}

function handleDeleteUser(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(api + '/' + id, options)
        .then(res => res.json())
        .then(() => {
            var itemUser = document.querySelector(`.user-item-${id}`);
            if (itemUser) {
                itemUser.remove();
            }
        })
}

function handleEditUser(id) {
    var nameTxt = document.querySelector(`.name-${id}`).textContent;
    var birthdayTxt = document.querySelector(`.birthday-${id}`).textContent;
    var genderTxt = document.querySelector(`.gender-${id}`).textContent;
    var roleTxt = document.querySelector(`.role-${id}`).textContent;


    var name = document.querySelector('#name');
    var birthday = document.querySelector('#birthday');
    var gender = document.querySelector('#gender');
    var role = document.querySelector('#role');

    var today = new Date();
    var dateNow = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    name.value = nameTxt;
    birthday.value = birthdayTxt;
    gender.value = genderTxt;
    role.value = roleTxt;


    btnUpdate = document.querySelector('#update');
    btnUpdate.addEventListener('click', update);

    function update() {
        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                birthday: birthday.value,
                createAdt: dateNow,
                gender: gender.value,
                role: role.value
            })
        }
        fetch(api + '/' + id, options)
            .then(res => res.json())
            .then(() => getUser(renderUsers))
    }

}

function handleCreateForm() {
    var btnCreate = document.getElementById('create');
    var today = new Date();
    var dateNow = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    var name = document.querySelector('#name');
    var birthday = document.querySelector('#birthday');
    var gender = document.querySelector('#gender');
    var role = document.querySelector('#role');

    btnCreate.onclick = function() {

        var formData = {
            name: name.value,
            birthday: birthday.value,
            createAdt: dateNow,
            gender: gender.value,
            role: role.value
        }
        createUser(formData, () => getUsers(renderUsers));
        // console.log(formData)
    }



}




var input = document.getElementById("filterInput");

function filters() {
    var filter, table, tr, td, i;
    filter = input.value.toUpperCase();

    table = document.getElementById("filterTable");
    tr = table.getElementsByTagName("tr");

    if (!filter) {
        table.style.display = "none";
    } else {
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    table.style.display = "table"
                    table.style.position = "absolute";
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
input.addEventListener("keyup", filters);