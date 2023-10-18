'use strict'

const dialog = document.querySelector("dialog");
const openDialogBtn = document.getElementById("open_dialog");
const closeDialogBtn = document.getElementById("close_dialog");

const elements = dialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstElement = elements[0];
const lastElement = elements[elements.length - 1];

const trapFocus = (e) => {
  if (e.key === "Tab") {
    const tabForwards = !e.shiftKey && document.activeElement === lastElement;
    const tabBackwards = e.shiftKey && document.activeElement === firstElement;
    if (tabForwards) {
      // only TAB is pressed, not SHIFT simultaneously
      // Prevent default behavior of keydown on TAB (i.e. focus next element)
      e.preventDefault();
      firstElement.focus();
    } else if (tabBackwards) {
      // TAB and SHIFT are pressed simultaneously
      e.preventDefault();
      lastElement.focus();
    }
  }
};

const openDialog = () => {
  dialog.showModal();
  dialog.addEventListener("keydown", trapFocus);
};

const closeDialog = (e) => {
  e.preventDefault();
  dialog.close();
  dialog.removeEventListener("keydown", trapFocus);
  openDialogBtn.focus();
};

openDialogBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);

const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

registrationForm.addEventListener('submit', (e) => {
   
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!name.match(namePattern)) {
        nameError.textContent = 'Nimen täytyy olla vähintään 3 merkkiä pitkä';
        e.preventDefault();
    } else {
        nameError.textContent = '';
    }

    if (!email.match(emailPattern)) {
        emailError.textContent = 'Sähköpostin täytyy olla @metropolia.fi päätteinen';
        e.preventDefault();
    } else {
        emailError.textContent = '';
    }

    if (!password.match(passwordPattern)) {
        passwordError.textContent = 'Salasanan täytyy olla vähintään 8 merkkiä pitkä, sekä sisältää vähintään yksi iso kirjain ja yksi numero.';
        e.preventDefault();
    } else {
        passwordError.textContent = '';
    }
});


const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");


    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
        bar.classList.toggle("active" + (bars.indexOf(bar) + 1));
    });
});

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})

