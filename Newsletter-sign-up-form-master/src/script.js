const button = document.querySelector(`.button`);
const input = document.querySelector(`#eInput`);
const container = document.querySelector(`.container`);
const form = document.querySelector(`.form`);
const validError = document.querySelector(`.vError`);

const verifyEmail = () => {
  if (input.value === ``) {
    validError.innerHTML = "Please Enter Your Email";
    input.style.border = `1px solid hsl(4, 100%, 67%)`;
    input.classList.add(`error`);
  } else {
    const eVerify = `https://api.hunter.io/v2/email-verifier?email=${input.value}&api_key=68636abce6357b537940553aea452c81c72d0a02`;
    const verify = async () => {
      try {
        const req = await fetch(eVerify);
        const json = await req.json();
        if (json.data.status !== "valid") {
          validError.innerHTML = "Valid Email Required";
          input.classList.add(`error`);
          input.style.border = `1px solid hsl(4, 100%, 67%)`;
        } else {
          nextLevel(json.data.status);
        }
      } catch (error) {
        validError.innerHTML = "Valid Email Required";
        input.classList.add(`error`);
        input.style.border = `1px solid hsl(4, 100%, 67%)`;
      }
    };
    verify();
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  verifyEmail();
});

button.addEventListener(`click`, (e) => {
  e.preventDefault();

  verifyEmail();
});

const nextLevel = (task) => {
  if (task === `valid`) {
    container.innerHTML = ``;
    container.style.display = `block`;
    container.style.padding = `40px`;
    container.innerHTML = `
<img src="../src/assets/icon-success.svg" alt="success" class="success-list"/>
<h1 class="title">Thanks for subscribing!</h1>
<p>A confirmation email has been sent to <strong>${input.value}</strong>.
please open it and click the button inside to confirm your subscription.
</p>
<a href="" class="button ">Dismiss massage</a>
`;
  } else {
    input.style.border = `1px solid hsl(4, 100%, 67%)`;
    input.classList.add(`error`);
  }
};
