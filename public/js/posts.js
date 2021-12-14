const submitBtn = document.getElementById("new-post");
const deleteBtn = document.querySelector(".post-list");

// calls route to add post to database...
const formSubmitHandler = async (event) => {
  event.preventDefault();
  const postNameEl = document.getElementById("post_name").value.trim();
  const postTextEl = document.getElementById("post_text").value.trim();

  // initiates api call...
  const response = await fetch("api/posts/add", {
    method: "POST",
    body: JSON.stringify({ post_name: postNameEl, post_text: postTextEl }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.redirected) {
    document.location.replace("/dashboard");
  } else {
    document.location.replace("/login");
  }
};

// calls route to delete post from the database...
const deleteHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const post_id = event.target.getAttribute("data-id");

    // initiates api call...
    const response = await fetch("api/posts/delete", {
      method: "POST",
      body: JSON.stringify({ post_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      window.alert("Signed-in user is not the poster.  Cannot delete...");
    }
    if (!response.redirected) {
      document.location.replace("/dashboard");
    } else {
      document.location.replace("/login");
    }
  }
};

submitBtn.addEventListener("submit", formSubmitHandler);
deleteBtn.addEventListener("click", deleteHandler);
