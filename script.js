window.onload = function onLoad() {
  const getMatrix = (language) => {
    const matrix = {
      code: [
        ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete'],
        ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
        ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
        ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'],
      ],
      en: [
        ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'DELETE'],
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '<-'],
        ['TAB', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['CAPSLOCK', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'ENTER'],
        ['SHIFT', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'SHIFT'],
        ['CTRL', '', 'ALT', '', 'Alt', 'CTRL', '◄', '▲', '▼', '►'],
      ],
      ru: [
        ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'DELETE'],
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '<-'],
        ['TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
        ['CAPSLOCK', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ENTER'],
        ['SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'SHIFT'],
        ['CTRL', 'EN/RU', 'ALT', '', 'Alt', 'CTRL', '◄', '▲', '▼', '►'],
      ],
    };
    return matrix[language];
  };

  // ----- menu rendering -----

  const dropdown = document.createElement('div');
  dropdown.setAttribute('class', 'dropdown');
  document.body.append(dropdown);
  const btn = document.createElement('button');
  btn.setAttribute('class', 'drop-btn');
  dropdown.append(btn);
  btn.innerText = 'Tips';
  const dropdownContent = document.createElement('div');
  dropdownContent.setAttribute('class', 'dropdown-content');
  dropdown.append(dropdownContent);

  let switches = document.createElement('div');
  switches.setAttribute('class', 'switches');
  dropdownContent.append(switches);
  switches.innerText = 'Keyboard view';
  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', 'keyboardViewCheckbox');
  checkbox.setAttribute('checked', 'checked');
  switches.append(checkbox);
  let label = document.createElement('label');
  label.setAttribute('for', 'keyboardViewCheckbox');
  switches.append(label);
  let span = document.createElement('span');
  label.append(span);

  let hr = document.createElement('hr');
  dropdownContent.append(hr);

  switches = document.createElement('div');
  switches.setAttribute('class', 'switches');
  dropdownContent.append(switches);
  switches.innerText = 'Key pressed sound';
  checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', 'keyPressedSound');
  switches.append(checkbox);
  label = document.createElement('label');
  label.setAttribute('for', 'keyPressedSound');
  switches.append(label);
  span = document.createElement('span');
  label.append(span);

  hr = document.createElement('hr');
  dropdownContent.append(hr);

  switches = document.createElement('div');
  switches.setAttribute('class', 'switches');
  dropdownContent.append(switches);
  switches.innerText = 'Win/ lose sound';
  checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', 'winLoseSound');
  checkbox.setAttribute('checked', 'checked');
  switches.append(checkbox);
  label = document.createElement('label');
  label.setAttribute('for', 'winLoseSound');
  switches.append(label);
  span = document.createElement('span');
  label.append(span);

  let startGameBtn = document.createElement('button');
  startGameBtn.setAttribute('class', 'drop-btn start-game-btn');
  startGameBtn.setAttribute('id', 'startGameBtn');
  startGameBtn.innerText = 'START GAME';
  document.body.append(startGameBtn);

  // ----- keyboard rendering -----

  const currentLanguage = 'en'; // temporary only one language
  const arrayKeyCode = getMatrix('code');
  let arrayButtons = [];
  const sumBtnInEveryRow = [14, 14, 14, 13, 12, 10];

  const createViewKeyboard = () => {
    const keyboard = document.createElement('div');
    keyboard.setAttribute('id', 'keyboard');
    document.body.append(keyboard);
    for (let i = 0; i < 6; i++) {
      const keyboardRow = document.createElement('ul');
      keyboardRow.setAttribute('class', 'cf');
      keyboard.append(keyboardRow);

      for (let j = 0; j < sumBtnInEveryRow[i]; j++) {
        const tagLi = document.createElement('li');
        keyboardRow.append(tagLi);
        const tagA = document.createElement('a');
        tagA.setAttribute('class', 'key');
        tagA.setAttribute('id', `${arrayKeyCode[i][j]}`);
        if (i === 0) {
          tagA.setAttribute('class', 'key fn');
        }
        tagLi.append(tagA);
        const tagSpan = document.createElement('span');
        tagSpan.setAttribute('class', 'spanKey');
        tagA.append(tagSpan);
      }
    }
  };
  createViewKeyboard();

  let capsLock = false;
  document.querySelector('#CapsLock').classList.remove('active');

  const paintLettersOnKeyboard = () => {
    arrayButtons = getMatrix(`${currentLanguage}`);
    // turn the two-dimensional array into the one-dimensional
    const arrayButtonsRow = [].concat(...arrayButtons);
    const arrTagSpan = document.querySelectorAll('.spanKey');
    for (let i = 0; i < arrTagSpan.length; i++) {
      if (capsLock) {
        arrTagSpan[i].innerText = `${arrayButtonsRow[i].toUpperCase()}`;
      } else {
        arrTagSpan[i].innerText = `${arrayButtonsRow[i]}`;
      }
    }
  };
  paintLettersOnKeyboard();

  // ----- tips checkboxes -----

  const keyboard = document.querySelector('#keyboard');
  const keyboardViewCheckbox = document.querySelector('#keyboardViewCheckbox');
  keyboardViewCheckbox.addEventListener('click', () => {
    if (keyboardViewCheckbox.checked) {
      keyboard.style.display = 'block';
    } else {
      keyboard.style.display = 'none';
    }
  });

  const winLoseSound = document.querySelector('#winLoseSound');
  function playSoundForWin() {
    if (winLoseSound.checked) {
      new Audio('src/audio/matched-letter.mp3').play();
    }
  }
  function playSoundForLose() {
    if (winLoseSound.checked) {
      new Audio('src/audio/err-matched-letter.mp3').play();
    }
  }

  const keyPressedSound = document.querySelector('#keyPressedSound');
  function keySound(pressedKeyValue) {
    if (keyPressedSound.checked) {
      new Audio(`src/audio/${currentLanguage}/${pressedKeyValue}.mp3`).play();
    }
  }

  // ----- game -----
  // temporary one language

  const enLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g',
    'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
  const sumEnLetters = 26;
  const fallingLetterSpeed = 200;

  const divLetterToFall = document.createElement('div');
  divLetterToFall.setAttribute('class', 'fall-letter');
  divLetterToFall.style.position = 'absolute';
  document.body.append(divLetterToFall);
  const letterToFallWithStyle = document.querySelector('.fall-letter');
  letterToFallWithStyle.style.top = '-3vh';
  letterToFallWithStyle.style.opacity = '1';
  let timerIdArray = [];

  const fallingLetter = () => {
    timerIdArray.forEach(clearTimeout);
    timerIdArray = [];
    let letterTop = -3;
    for (let i = 0; i < 93; i++) {
      timerIdArray.push(setTimeout(() => {
        letterTop += 1;
        letterToFallWithStyle.style.top = `${letterTop}vh`;
        letterToFallWithStyle.style.opacity = (92 - i) / 100;
        if (letterTop === 90) {
          alert('GAME OVER!');
        }
      }, fallingLetterSpeed * i));
    }
  };

  function generateNewLetter() {
    letterToFallWithStyle.innerText = '';
    letterToFallWithStyle.innerText = enLetters[Math.floor(Math.random() * sumEnLetters)];
    fallingLetter();
  }

  const isLettersMatch = (pressedKeyValue) => {
    const letterOnScreen = letterToFallWithStyle.innerText;
    if (letterOnScreen === pressedKeyValue) {
      playSoundForWin();
      // fallingLetterSpeed -= 50;
      generateNewLetter();
    } else {
      playSoundForLose();
    }
  };

  startGameBtn = document.querySelector('#startGameBtn');
  startGameBtn.addEventListener('click', () => {
    generateNewLetter();
  });

  // ----- keydown, keyup listeners -----

  document.addEventListener('keydown', (event) => {
    event.preventDefault();

    document.querySelector(`#${event.code}`)
      .classList
      .add('active'); // add colour and animation effect

    let pressedKeyValue = '';
    switch (event.code) {
      case ('Tab'):
        pressedKeyValue = '    ';
        break;
      case ('Space'):
        pressedKeyValue = ' ';
        break;
      case ('Enter'):
        pressedKeyValue = '\n';
        break;
      case ('Backspace'):
        pressedKeyValue = 'Backspace';
        break;
      case ('Delete'):
        pressedKeyValue = 'Delete';
        break;
      case ('CapsLock'):
        if (capsLock) {
          capsLock = false;
          document.querySelector('#CapsLock')
            .classList
            .remove('active');
        } else {
          capsLock = true;
          document.querySelector('#CapsLock')
            .classList
            .add('active');
        }
        paintLettersOnKeyboard();
        break;
      case ('ControlLeft'):
      case ('ControlRight'):
      case ('AltLeft'):
      case ('AltRight'):
      case ('ShiftLeft'):
      case ('ShiftRight'):
      case ('Escape'):
      case ('F1'):
      case ('F2'):
      case ('F3'):
      case ('F4'):
      case ('F5'):
      case ('F6'):
      case ('F7'):
      case ('F8'):
      case ('F9'):
      case ('F10'):
      case ('F11'):
      case ('F12'):
        break;
      default:
        pressedKeyValue = document.querySelector(`#${event.code}`).childNodes[0].textContent;
    }
    isLettersMatch(pressedKeyValue);
    keySound(pressedKeyValue);
    // changeViewTextarea(pressedKeyValue);
  });

  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    document.querySelector(`#${event.code}`)
      .classList
      .remove('active');
  });
};

/*  ----- keep this code here for next level of game -----

const createViewTextarea = () => {
 const textarea = document.createElement('textarea');
 textarea.setAttribute('name', 'textarea');
 textarea.setAttribute('id', 'textarea');
 textarea.setAttribute('autofocus', 'true');
 document.body.append(textarea);
 };
 createViewTextarea();

 const changeViewTextarea = (pressedKeyValue) => {
 const TextInsideTextarea = document.querySelector('textarea');
 if ((pressedKeyValue === 'Backspace') && (TextInsideTextarea.selectionStart !== 0)) {
 TextInsideTextarea
 .setRangeText('', TextInsideTextarea.selectionStart - 1,TextInsideTextarea.selectionEnd);
 } else if (pressedKeyValue === 'Delete') {
 TextInsideTextarea
 .setRangeText('', TextInsideTextarea.selectionStart, TextInsideTextarea.selectionEnd + 1);
 } else if ((pressedKeyValue === 'Backspace') && (TextInsideTextarea.selectionStart === 0)) {
 } else {
 TextInsideTextarea.value += `${pressedKeyValue}`;
 }
 };
 document.addEventListener('click', () => {
 document.getElementById('textarea')
 .focus();
 });
 */
