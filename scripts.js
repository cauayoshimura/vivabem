// Função para iniciar a aplicação após o usuário inserir seu nome
function startApp() {
    const username = document.getElementById('username').value;
    if (username.trim() !== '') {
        user.name = username;
        document.querySelector('.welcome-container').style.display = 'none';
        document.querySelector('.main-container').style.display = 'block';
        updateProfile();
    } else {
        alert('Por favor, insira seu nome.');
    }
}

// Dados do usuário (apenas para exemplo)
let user = {
    name: "",
    activities: [],
    diets: [],
    hydration: []
};

// Função para exibir o botão de editar
function createEditButton(index, type) {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.classList.add('edit-button');
    button.addEventListener('click', function() {
        const newValue = prompt(`Editar ${type}:`, user[type][index].value);
        if (newValue !== null) {
            user[type][index].value = newValue;
            updateProfile();
        }
    });
    return button;
}

// Função para exibir o botão de remover
function createRemoveButton(index, type) {
    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.classList.add('remove-button');
    button.addEventListener('click', function() {
        user[type].splice(index, 1); // Remove o item do array
        updateProfile(); // Atualiza o perfil do usuário na tela
    });
    return button;
}

// Função para criar um item na lista do perfil do usuário
function createListItem(item, type, index) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.textContent = `${item.name}: ${item.value}`;
    listItem.appendChild(createEditButton(index, type));
    listItem.appendChild(createRemoveButton(index, type));
    return listItem;
}

// Função para atualizar o perfil do usuário na tela
function updateProfile() {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = ''; // Limpa o conteúdo anterior

    // Nome do usuário
    const nameHeader = document.createElement('h3');
    nameHeader.textContent = `Nome: ${user.name || "Nome não inserido"}`; // Se o usuário não inseriu o nome, exibe "Nome não inserido"
    profileDiv.appendChild(nameHeader);

    // Atividades Físicas
    const activitiesList = document.createElement('ul');
    user.activities.forEach((activity, index) => {
        activitiesList.appendChild(createListItem(activity, 'activities', index));
    });
    profileDiv.appendChild(activitiesList);

    // Dietas
    const dietsList = document.createElement('ul');
    user.diets.forEach((diet, index) => {
        dietsList.appendChild(createListItem(diet, 'diets', index));
    });
    profileDiv.appendChild(dietsList);

    // Hidratação
    const hydrationList = document.createElement('ul');
    user.hydration.forEach((hydration, index) => {
        hydrationList.appendChild(createListItem(hydration, 'hydration', index));
    });
    profileDiv.appendChild(hydrationList);
}

// Função para registrar atividade física
function registerActivity(event) {
    event.preventDefault(); // Impede o envio do formulário
    const activityName = document.getElementById('activity').value;
    const activityDuration = document.getElementById('duration').value;
    user.activities.push({ name: activityName, value: activityDuration });
    updateProfile();
    document.getElementById('activity-form').reset(); // Limpa o formulário
}

// Função para registrar dieta
function registerDiet(event) {
    event.preventDefault(); // Impede o envio do formulário
    const foodName = document.getElementById('food').value;
    const foodQuantity = document.getElementById('quantity').value;
    user.diets.push({ name: foodName, value: foodQuantity });
    updateProfile();
    document.getElementById('diet-form').reset(); // Limpa o formulário
}

// Função para registrar hidratação
function registerHydration(event) {
    event.preventDefault(); // Impede o envio do formulário

    const drinkAmount = parseFloat(document.getElementById('amount').value); 
    const userWeight = parseFloat(document.getElementById('peso').value); 

    if (drinkAmount < 35 * userWeight) {
        alert(`ATENÇÃO, é indicado que você beba ao menos: ${userWeight * 35} mL de água por dia.`);
    }

    const drinkName = 'Água';

    user.hydration.push({name: drinkName, value: drinkAmount });

    // Update the profile display
    updateProfile();

    // Reset the form
    document.getElementById('hydration-form').reset();
}

// Adiciona os eventos de envio de formulário
document.getElementById('activity-form').addEventListener('submit', registerActivity);
document.getElementById('diet-form').addEventListener('submit', registerDiet);
document.getElementById('hydration-form').addEventListener('submit', registerHydration);

// Atualiza o perfil do usuário na primeira vez que a página é carregada
updateProfile();

// Função para exibir a tela principal do usuário e ocultar a tela inicial
function showMain() {
    document.querySelector('.welcome-container').style.display = 'none';
    document.querySelector('.main-container').style.display = 'block';
}


