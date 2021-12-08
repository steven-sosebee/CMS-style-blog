// const e = require("express");

const submitBtn = document.getElementById("new-post");
const deleteBtn = document.querySelector(".post-list");

const formSubmitHandler = async (event) => {
  event.preventDefault();

  const postNameEl = document.getElementById("post_name").value.trim();
  const postTextEl = document.getElementById("post_text").value.trim();
  console.log(postNameEl);
  console.log(postTextEl);
  const response = await fetch("api/posts/add", {
    method: "POST",
    body: JSON.stringify({ post_name: postNameEl, post_text: postTextEl }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.redirected) {
    document.location.replace("/posts");
  } else {
    document.location.replace("/login");
  }
};

const deleteHandler = async (event) => {
  console.log("deleting post...");
  if (event.target.hasAttribute("data-id")) {
    const post_id = event.target.getAttribute("data-id");
    const response = await fetch("api/posts/delete", {
      method: "POST",
      body: JSON.stringify({ post_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.redirected) {
      document.location.replace("/posts");
    } else {
      document.location.replace("/login");
    }
  }
};

submitBtn.addEventListener("submit", formSubmitHandler);
deleteBtn.addEventListener("click", deleteHandler);
