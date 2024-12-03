// Selecciona el botón de hamburguesa y el menú
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// Agrega un evento de clic al botón hamburguesa
hamburger.addEventListener('click', () => {
    // Alterna la clase "show" en el menú
    menu.classList.toggle('show');
});


// Guardar nuevas notas
document.getElementById('save-note').addEventListener('click', function() {
  const content = document.getElementById('note-content').value.trim();
  const tags = document.getElementById('etiquetas').value.trim();
  const date = new Date();
  const formattedDate = `${date.getDate()} ${date.toLocaleString('es-ES', { month: 'short' })} ${date.getFullYear()}`;
  const dataDate = `${date.toLocaleString('en-GB', { month: 'short' }).toLowerCase()}${date.getFullYear()}`;

  if (content) {
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.setAttribute('data-date', dataDate);
    newNote.setAttribute('data-tags', tags);
    newNote.textContent = `${formattedDate} - ${content}`;
    document.getElementById('notes').appendChild(newNote);

    // Limpiar campos
    document.getElementById('note-content').value = '';
    document.getElementById('etiquetas').value = '';
  } else {
    alert('Por favor, escribe una nota antes de guardar.');
  }
});

// Genera el rango de años
const yearSelect = document.getElementById("filter-year");
const currentYear = new Date().getFullYear();
for (let year = currentYear - 10; year <= currentYear + 10; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

// Evento para filtrar notas
document.querySelector("#month-year-picker").addEventListener("change", function () {
  const selectedMonth = document.getElementById("filter-month").value;
  const selectedYear = document.getElementById("filter-year").value;

  const notes = document.querySelectorAll(".note");
  notes.forEach(note => {
    const noteDate = note.getAttribute("data-date");
    if (noteDate.includes(`${selectedYear}-${selectedMonth}`)) {
      note.classList.remove("hidden");
    } else {
      note.classList.add("hidden");
    }
  });
});


// Filtrar notas por etiquetas
document.getElementById('filter-tags').addEventListener('input', function() {
  const filterTags = this.value.toLowerCase();
  const notes = document.querySelectorAll('.note');
  notes.forEach(note => {
    const tags = note.dataset.tags.toLowerCase();
    if (tags.includes(filterTags)) {
      note.style.display = 'flex';
    } else {
      note.style.display = 'none';
    }
  });
});

