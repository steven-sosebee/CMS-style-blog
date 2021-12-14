const btnLogin = document.getElementById("login-form");
const btnSignUp = document.getElementById("signup-form");

// event listener for the login form...
const loginHandler = async (event) => {
  event.preventDefault();
  const user_name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();
  console.log(user_name);
  console.log(password);

  // passes user inputs to the database...
  const login = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ user_name, password }),
    headers: { "Content-Type": "application/json" },
  });
  if (login.ok) {
    document.location.replace("/dashboard");
  }
};

// event listener for the signup form...
const signupHandler = async (event) => {
  event.preventDefault();
  const user_name = document.getElementById("signup_name").value.trim();
  const user_email = document.getElementById("signup_email").value.trim();
  const password = document.getElementById("signup_password").value.trim();

  // passes user inputs to the database...
  const login = await fetch("/api/login/signup", {
    method: "POST",
    body: JSON.stringify({ user_email, user_name, password }),
    headers: { "Content-Type": "application/json" },
  });
  if (login.ok) {
    document.location.replace("/dashboard");
  }
};

btnLogin.addEventListener("submit", loginHandler);
btnSignUp.addEventListener("submit", signupHandler);
