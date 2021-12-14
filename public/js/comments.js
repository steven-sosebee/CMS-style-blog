const submitBtn = document.getElementById("new-comment");
const deleteBtn = document.querySelector(".comment-list");

// runs the comment route to add a comment to the database...
const formSubmitHandler = async (event) => {
  event.preventDefault();
  const postEl = document.getElementById("post-id").innerText.trim();
  const commentEl = document.getElementById("comment").value.trim();
  const response = await fetch("/api/comments/add", {
    method: "POST",
    body: JSON.stringify({ comment: commentEl, post_id: postEl }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.redirected) {
    document.location.reload();
  } else {
    document.location.replace("/login");
  }
};

// deletes selected comment...
const deleteHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const comment_id = event.target.getAttribute("data-id");
    const response = await fetch("api/comments/delete", {
      method: "POST",
      body: JSON.stringify({ comment_id }),
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
