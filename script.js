document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('task-input');
  const addBtn = document.getElementById('add-task');
  const list = document.querySelector('.task-list');
  const bar = document.querySelector('.progress-bar');
  const countText = document.querySelector('.progress-count');
  const progressText = document.querySelector('.progress-text');

  function updateProgress() {
    const all = list.children.length;
    const done = list.querySelectorAll('.completed').length;
    const pct = all ? Math.round((done / all) * 100) : 0;
    bar.style.width = pct + '%';
    countText.textContent = `${done} / ${all}`;
    progressText.textContent = all
      ? done === all ? 'All Done! 🎉' : 'Keep it Up!'
      : 'Add a task!';
  }

  function createTask(txt) {
    const li = document.createElement('li');
    li.className = 'task-item';
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = txt;
    span.addEventListener('click', () => {
      span.classList.toggle('completed');
      updateProgress();
    });
    const actions = document.createElement('div');
    actions.className = 'actions';

    const btnEdit = document.createElement('button');
    btnEdit.className = 'edit';
    btnEdit.innerHTML = '<i class="fas fa-pen"></i>';
    btnEdit.addEventListener('click', () => {
      const n = prompt('Edit task:', span.textContent);
      if (n && n.trim()) {
        span.textContent = n.trim();
      }
    });

    const btnDel = document.createElement('button');
    btnDel.className = 'delete';
    btnDel.innerHTML = '<i class="fas fa-trash"></i>';
    btnDel.addEventListener('click', () => {
      list.removeChild(li);
      updateProgress();
    });

    actions.append(btnEdit, btnDel);
    li.append(span, actions);
    return li;
  }

  function addTask() {
    const val = input.value.trim();
    if (!val) return;
    list.append(createTask(val));
    input.value = '';
    updateProgress();
  }

  addBtn.addEventListener('click', addTask);
  input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

  // Initial state
  updateProgress();
});
