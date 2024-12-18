document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');
    const preloader = document.getElementById('preloader');
    const errorMessage = document.getElementById('error');
    const saveButton = document.getElementById('saveParams');
    const loadButton = document.getElementById('loadParams');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        preloader.style.display = 'block';
        errorMessage.style.display = 'none';
        tableContainer.innerHTML = '';

        const formData = new FormData(form);
        const days = parseInt(formData.get('days'), 10);
        const lessons = parseInt(formData.get('lessons'), 10);
        const language = formData.get('language');

        try {
            const randomCondition = Math.random() > 0.5;
            const filter = randomCondition ? '?id_gte=5' : '?id_lte=5';
            const response = await fetch(`https://jsonplaceholder.typicode.com/users${filter}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const users = await response.json();

            preloader.style.display = 'none';

            generateTable(users, days, lessons, language);

        } catch (error) {
            preloader.style.display = 'none';
            errorMessage.style.display = 'block';
            errorMessage.textContent = '⚠️ Something went wrong: ' + error.message;
        }
    });

    saveButton.addEventListener('click', () => {
        const formData = new FormData(form);
        const params = {
            days: formData.get('days'),
            lessons: formData.get('lessons'),
            language: formData.get('language'),
        };
        localStorage.setItem('tableParams', JSON.stringify(params));
        alert('Parameters saved!');
    });

    loadButton.addEventListener('click', () => {
        const params = JSON.parse(localStorage.getItem('tableParams'));
        if (params) {
            form.elements['days'].value = params.days;
            form.elements['lessons'].value = params.lessons;
            form.elements['language'].value = params.language;
            alert('Parameters loaded!');
        } else {
            alert('No parameters found!');
        }
    });

    /**
     * Function to generate table with fetched data
     * @param {Array} data - Array of user data
     * @param {number} days - Number of days
     * @param {number} lessons - Number of lessons
     * @param {string} language - Selected language
     */
    function generateTable(data, days, lessons, language) {
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('generated-table');

        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        const dayHeader = document.createElement('th');
        dayHeader.textContent = language === 'en' ? 'Day' : 'День';
        headRow.appendChild(dayHeader);

        for (let i = 1; i <= lessons; i++) {
            const th = document.createElement('th');
            th.textContent = `${language === 'en' ? 'Lesson' : 'Урок'} ${i}`;
            headRow.appendChild(th);
        }
        thead.appendChild(headRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        let dataIndex = 0;

        for (let i = 1; i <= days; i++) {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = `${language === 'en' ? 'Day' : 'День'} ${i}`;
            row.appendChild(dayCell);

            for (let j = 0; j < lessons; j++) {
                const cell = document.createElement('td');

                const user = data[dataIndex % data.length];
                cell.textContent = `${user.name} ${user.username}`;
                dataIndex++;

                cell.contentEditable = true;
                row.appendChild(cell);
            }

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }


});