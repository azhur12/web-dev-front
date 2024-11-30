document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');
    const saveButton = document.getElementById('saveParams');
    const loadButton = document.getElementById('loadParams');

    // Генерация таблицы при отправке формы
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        // Получаем данные формы
        const formData = new FormData(form);
        const days = parseInt(formData.get('days'), 10);
        const lessons = parseInt(formData.get('lessons'), 10);
        const language = formData.get('language');

        // Очищаем контейнер таблицы
        tableContainer.innerHTML = '';

        // Создаем таблицу
        const table = document.createElement('table');
        table.classList.add('generated-table');

        // Создаем заголовок таблицы
        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        headRow.innerHTML = `<th>${language === 'en' ? 'Day' : 'День'}</th>`;
        for (let i = 1; i <= lessons; i++) {
            const th = document.createElement('th');
            th.textContent = `${language === 'en' ? 'Lesson' : 'Урок'} ${i}`;
            headRow.appendChild(th);
        }
        thead.appendChild(headRow);
        table.appendChild(thead);

        // Создаем тело таблицы
        const tbody = document.createElement('tbody');
        for (let i = 1; i <= days; i++) {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = `${language === 'en' ? 'Day' : 'День'} ${i}`;
            row.appendChild(dayCell);

            for (let j = 1; j <= lessons; j++) {
                const cell = document.createElement('td');
                cell.textContent = '-'; // Пустая ячейка
                cell.contentEditable = true; // Делаем ячейку редактируемой
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
        table.appendChild(tbody);

        // Добавляем таблицу в контейнер
        tableContainer.appendChild(table);
    });

    // Сохранение параметров в LocalStorage
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

    // Загрузка параметров из LocalStorage
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
});
