(function () {
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-bs-theme', saved);
  updateIcon();
  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', next);
    localStorage.setItem('theme', next);
    updateIcon();
  });
  function updateIcon() { toggle.textContent = html.getAttribute('data-bs-theme') === 'dark' ? '☀️' : '🌙'; }
})();

function showToast(msg) {
  const el = document.getElementById('toast');
  const body = document.getElementById('toastMsg');
  if (!el || !body) { alert(msg); return; }
  body.textContent = msg;
  new bootstrap.Toast(el).show();
}

(function () {
  const b = document.getElementById('toTop');
  if (!b) return;
  window.addEventListener('scroll', () => b.classList.toggle('show', window.scrollY > 400));
  b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
// ===== Эффект падающих букв для заголовка =====
// ===== Эффект падающих букв для заголовка =====
// ===== Эффект падающих букв для заголовка =====
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector('h1');
  if (!h1) return;

  // Сохраняем оригинальный HTML
  const originalHTML = h1.innerHTML;
  h1.innerHTML = '';
  
  let letterIndex = 0;

  // Функция для обхода текста
  function wrapLetters(node, parentSpan = null) {
    if (node.nodeType === 3) { // Текстовый узел
      const text = node.nodeValue;
      // Разбиваем текст на слова (сохраняя пробелы)
      const words = text.split(/(\s+)/); 
      
      words.forEach(word => {
        if (word.trim() === '') {
          // Если это просто пробел, оставляем как есть
          if (parentSpan) parentSpan.appendChild(document.createTextNode(word));
          else h1.appendChild(document.createTextNode(word));
        } else {
          // Создаем контейнер для слова (чтобы оно не ломалось посередине)
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';
          wordSpan.style.whiteSpace = 'nowrap';

          for (let i = 0; i < word.length; i++) {
            const span = document.createElement('span');
            span.textContent = word[i];
            span.className = 'drop-letter';
            span.style.animationDelay = `${letterIndex * 0.04}s`;
            wordSpan.appendChild(span);
            letterIndex++;
          }
          
          if (parentSpan) parentSpan.appendChild(wordSpan);
          else h1.appendChild(wordSpan);
        }
      });
    } else if (node.nodeType === 1) { // Элемент (например, <span> с цветом)
      const clone = node.cloneNode(false); 
      if (parentSpan) parentSpan.appendChild(clone);
      else h1.appendChild(clone);
      
      for (let child of node.childNodes) {
        wrapLetters(child, clone);
      }
    }
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = originalHTML;
  for (let child of tempDiv.childNodes) {
    wrapLetters(child);
  }
});