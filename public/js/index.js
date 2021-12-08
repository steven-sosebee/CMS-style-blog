const btnLogin = document.getElementById("login-form");

const loginHandler = async (event) => {
  event.preventDefault();
  const user_name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();
  console.log(user_name);
  console.log(password);
  const login = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ user_name, password }),
    headers: { "Content-Type": "application/json" },
  });
  if (login.ok) {
    document.location.replace("/");
  }
};

btnLogin.addEventListener("submit", loginHandler);
