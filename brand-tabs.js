(() => {
  const group = document.querySelector('.brand-tabs');
  const description = document.querySelector('#brand-description');
  const modelsHeading = document.querySelector('#models-heading');
  const armoredHeading = document.querySelector('#armored-heading');
  const fallback = document.querySelector('.brand-fallback');
  if (!group || !description) return;
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  if (tabs.length !== 5 || panels.some(panel => !panel)) return;
  const descriptions = [
    ...['Cadillac', 'Chevrolet', 'Hummer', 'GMC'].map(name => `Работаем с разными поколениями ${name}. Возможность ремонта уточняйте по году выпуска и комплектации.`),
    'Работаем с тяжёлыми и бронированными автомобилями. Для обслуживания используем подъёмник грузоподъёмностью до 6 тонн.'
  ];
  const activate = (index, moveFocus = false) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    description.textContent = descriptions[index];
    if (modelsHeading && armoredHeading) {
      modelsHeading.hidden = index === 4;
      armoredHeading.hidden = index !== 4;
    }
    if (moveFocus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(next, true);
    });
  });
  group.hidden = false;
  if (fallback) fallback.hidden = true;
})();
