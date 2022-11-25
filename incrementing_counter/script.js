const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  counter.innerText = '0';

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const c = +counter.innerText;

    const increment = target / 100;

    const newValue = Math.ceil(c + increment);


    if (newValue < target) {
      counter.innerText = `${newValue}`;
      setTimeout(updateCounter, 10);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});