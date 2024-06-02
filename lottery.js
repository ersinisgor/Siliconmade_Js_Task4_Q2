const allNumberInputs = document.querySelectorAll('input[name="number"]');

allNumberInputs.forEach(input => {
  input.addEventListener("blur", handleInputBlur);
});

function handleInputBlur(event) {
  const input = event.target;
  const value = Math.floor(parseFloat(input.value));

  if (input.value === "" || isNaN(value) || value < 1 || value > 49) {
    if (input.value !== "") {
      alert("1-49 sayıları arasında bir sayı girmelisiniz");
    }
    input.value = "";
    return;
  }

  input.value = value;

  const inputs = Array.from(allNumberInputs).filter(i => i !== input);

  if (inputs.some(i => Math.floor(parseFloat(i.value)) === value)) {
    alert("Aynı tahmin bir kez girilebilir.");
    input.value = "";
  }
}

function handleGuess() {
  const guesses = Array.from(allNumberInputs).map(input =>
    Math.floor(parseFloat(input.value))
  );

  if (guesses.some(isNaN)) {
    alert("Lütfen geçerli 6 adet tahmin giriniz.");
    return;
  }

  if (guesses.length !== new Set(guesses).size) {
    alert("Aynı tahmin bir kez girilebilir.");
    return;
  }

  guesses.sort((a, b) => a - b);
  allNumberInputs.forEach((input, index) => {
    input.value = guesses[index];
  });

  document.getElementById("text").innerText = "Tahminler girildi.";
  document.getElementById("guessButton").disabled = true;
  document.getElementById("drawButton").disabled = false;
}

function drawLottery() {
  const lottoNumbers = [];
  while (lottoNumbers.length < 6) {
    const number = Math.floor(Math.random() * 49) + 1;
    if (!lottoNumbers.includes(number)) {
      lottoNumbers.push(number);
    }
  }

  lottoNumbers.sort((a, b) => a - b);
  document.querySelectorAll("#lotteryForm input").forEach((input, index) => {
    input.value = lottoNumbers[index];
  });

  const guesses = Array.from(allNumberInputs).map(input =>
    Math.floor(parseFloat(input.value))
  );

  const matchedNumbers = guesses.filter(num => lottoNumbers.includes(num));

  document.getElementById("matchedNumbers").innerText =
    "Bilinen Sayılar: " + matchedNumbers.join(", ");
  document.getElementById("matchCount").innerText =
    "Kaç Adet Sayı Bildiniz: " + matchedNumbers.length;
}

function resetGame() {
  allNumberInputs.forEach(input => (input.value = ""));
  document.getElementById("guessButton").disabled = false;

  document
    .querySelectorAll("#lotteryForm input")
    .forEach(input => (input.value = ""));
  document.getElementById("drawButton").disabled = true;

  document.getElementById("matchedNumbers").innerText = "";
  document.getElementById("matchCount").innerText = "";
  document.getElementById("text").innerText = "";
}
