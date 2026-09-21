const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const gameForm = document.getElementById("gameForm");
const gameToast = document.getElementById("gameToast");

console.log("GameVault is ready!");

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();
  const games = document.querySelectorAll(".game-card");

  games.forEach(function (game) {
    const gameName = game.querySelector("h3").textContent.toLowerCase();

    if (gameName.includes(searchText)) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  });
});

statusFilter.addEventListener("change", function () {
  const selectedStatus = statusFilter.value;
  const games = document.querySelectorAll(".game-card");

  games.forEach(function (game) {
    const gameStatus = game.getAttribute("data-status");

    if (selectedStatus === "all" || gameStatus === selectedStatus) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  });
});

gameForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const gameName = document.getElementById("gameName").value;
  const platform = document.getElementById("platform").value;
  const genre = document.getElementById("genre").value;
  const status = document.getElementById("status").value;

  const gameCard = document.createElement("div");

  gameCard.className = "game-card";
  gameCard.setAttribute("data-status", status);

  gameCard.innerHTML = `
        <h3>${gameName}</h3>
        <p>Platform: ${platform}</p>
        <p>Genre: ${genre}</p>
        <p>Status: ${status}</p>
        <p>Rating: Not Rated</p>
        <p>Tags: #new-game</p>
    `;

  document.getElementById("gamesSection").appendChild(gameCard);

  gameForm.reset();

  const gameCount = document.getElementById("gameCount");
  const games = document.querySelectorAll(".game-card");

  gameCount.textContent = games.length;

  const toast = new bootstrap.Toast(gameToast);
  toast.show();
});

const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function () {
  const games = document.querySelectorAll(".game-card");

  games.forEach(function (game) {
    game.remove();
  });

  const gameCount = document.getElementById("gameCount");
  gameCount.textContent = "0";

  gameToast.querySelector(".toast-body").textContent = "Backlog cleared!";
  gameToast.querySelector(".toast-body").textContent =
    "Game added successfully!";

  const toast = new bootstrap.Toast(gameToast);
  toast.show();
});
