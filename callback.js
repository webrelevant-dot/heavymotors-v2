(() => {
  const dialog = document.querySelector('.callback-dialog');
  const form = document.querySelector('#callback-form');
  if (!dialog || !form) return;
  let opener = null;
  document.querySelectorAll('[data-callback-open]').forEach((button) => {
    button.addEventListener('click', () => {
      opener = button;
      dialog.showModal();
    });
  });
  dialog.querySelector('[data-callback-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
  const phone = form.elements.phone;
  [phone, form.elements.name, form.elements.problem].forEach((field) => {
    field.addEventListener('input', () => field.setCustomValidity(''));
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    for (const field of [form.elements.name, form.elements.problem]) {
      if (!field.value.trim()) {
        field.setCustomValidity('Пожалуйста, заполните это поле.');
        field.reportValidity();
        return;
      }
      field.setCustomValidity('');
    }
    const digits = phone.value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      phone.setCustomValidity('Введите номер телефона: от 10 до 15 цифр.');
      phone.reportValidity();
      return;
    }
    phone.setCustomValidity('');
    const message = `Здравствуйте! Пожалуйста, перезвоните мне.\nИмя: ${form.elements.name.value.trim()}\nТелефон: ${phone.value.trim()}\nПроблема: ${form.elements.problem.value.trim()}`;
    const url = `https://wa.me/79150183838?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
