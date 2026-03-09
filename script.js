const games = [
  {
    name: "Bible General Quiz",
    winners: [
      { name: "Abel", score: 35, photo: "https://i.pravatar.cc/90?img=11" },
      { name: "Grace", score: 26, photo: "https://i.pravatar.cc/90?img=5" },
      { name: "Daniel", score: 20, photo: "https://i.pravatar.cc/90?img=13" },
      { name: "Lydia", score: 30, photo: "https://i.pravatar.cc/90?img=32" }
    ]
  },
  {
    name: "Bible Portion Quiz",
    winners: [
      { name: "Miriam", score: 28, photo: "https://i.pravatar.cc/90?img=44" },
      { name: "John", score: 31, photo: "https://i.pravatar.cc/90?img=15" },
      { name: "Esther", score: 24, photo: "https://i.pravatar.cc/90?img=47" },
      { name: "Joel", score: 19, photo: "https://i.pravatar.cc/90?img=64" }
    ]
  },
  {
    name: "Bible Memory Verse",
    winners: [
      { name: "Ruth", score: 22, photo: "https://i.pravatar.cc/90?img=23" },
      { name: "Samuel", score: 34, photo: "https://i.pravatar.cc/90?img=58" },
      { name: "Naomi", score: 27, photo: "https://i.pravatar.cc/90?img=48" },
      { name: "Caleb", score: 17, photo: "https://i.pravatar.cc/90?img=29" }
    ]
  },
  {
    name: "Bible Quick Reference",
    winners: [
      { name: "Peter", score: 25, photo: "https://i.pravatar.cc/90?img=41" },
      { name: "Hannah", score: 32, photo: "https://i.pravatar.cc/90?img=53" },
      { name: "Tim", score: 18, photo: "https://i.pravatar.cc/90?img=66" },
      { name: "Deborah", score: 29, photo: "https://i.pravatar.cc/90?img=24" }
    ]
  }
];

const boards = document.getElementById("boards");
const gameSelect = document.getElementById("game-select");
const personSelect = document.getElementById("person-select");
const updateButton = document.getElementById("update-score");
const gameTemplate = document.getElementById("game-template");

function renderBoards() {
  boards.innerHTML = "";

  games.forEach((game, gameIndex) => {
    const clone = gameTemplate.content.cloneNode(true);
    clone.querySelector("h2").textContent = game.name;
    const chart = clone.querySelector(".chart");

    game.winners.forEach((winner) => {
      const barWrap = document.createElement("div");
      barWrap.className = "bar-wrap";

      const avatar = document.createElement("img");
      avatar.className = "avatar";
      avatar.src = winner.photo;
      avatar.alt = `${winner.name} photo`;

      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${Math.min(winner.score * 4, 180)}px`;

      const score = document.createElement("span");
      score.className = "score";
      score.textContent = `${winner.score} marks`;

      const name = document.createElement("span");
      name.className = "name";
      name.textContent = winner.name;

      barWrap.append(avatar, bar, score, name);
      chart.appendChild(barWrap);
    });

    boards.appendChild(clone);
  });
}

function hydrateControls() {
  gameSelect.innerHTML = games
    .map((game, index) => `<option value="${index}">${game.name}</option>`)
    .join("");
  updatePersonSelect();
}

function updatePersonSelect() {
  const selectedGame = games[gameSelect.value] || games[0];
  personSelect.innerHTML = selectedGame.winners
    .map((winner, index) => `<option value="${index}">${winner.name}</option>`)
    .join("");
}

updateButton.addEventListener("click", () => {
  const gameIndex = Number(gameSelect.value);
  const personIndex = Number(personSelect.value);

  games[gameIndex].winners[personIndex].score += 10;
  renderBoards();
});

gameSelect.addEventListener("change", updatePersonSelect);

hydrateControls();
renderBoards();
