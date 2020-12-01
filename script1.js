const ruLetters = ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'];
const sumRuLetters = 33;

const divLetterToFall = document.createElement('div');
divLetterToFall.setAttribute('class', 'fall-letter');
divLetterToFall.style.position = 'absolute';
document.body.append(divLetterToFall);
const fallingLetter = (letter, speed) => {
  let letterTop = parseInt(letter.style.top);
  for (let i = 0; i < 90; i++) {
    setTimeout(() => {
      letterTop += 1;
      letter.style.top = `${letterTop}vh`;
      //console.log(letter.style.top);
      letter.style.opacity = (90 - i) / 100;
    }, speed * (i + 1));
  }
};

setInterval(() => {
  divLetterToFall.innerText = ruLetters[Math.floor(Math.random() * sumRuLetters)];
  const letterToFallWithStyle = document.querySelector('.fall-letter');
  letterToFallWithStyle.style.top = '-6vh';
  letterToFallWithStyle.style.opacity = '1';
  fallingLetter(letterToFallWithStyle, 50);
}, 4500);
