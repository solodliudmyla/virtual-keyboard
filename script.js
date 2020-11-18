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
        ['CTRL', 'EN/RU', 'ALT', 'SPACE', 'Alt', 'CTRL', '◄', '▲', '▼', '►'],
      ],
      ru: [
        ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'DELETE'],
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '<-'],
        ['TAB', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
        ['CAPSLOCK', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ENTER'],
        ['SHIFT', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'SHIFT'],
        ['CTRL', 'EN/RU', 'ALT', 'SPACE', 'Alt', 'CTRL', '◄', '▲', '▼', '►'],
      ],
    };
    return matrix[language];
  };

  let currentLanguage = localStorage.getItem('currentLanguage');
  if (currentLanguage === null) {
    currentLanguage = 'en';
  }

  const arrayKeyCode = getMatrix('code');
  let arrayButtons = [];
  let capsLock = false;
  const sumBtnInEveryRow = [14, 14, 14, 13, 12, 10];

  const createViewTextarea = () => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'textarea');
    textarea.setAttribute('id', 'textarea');
    textarea.setAttribute('autofocus', 'true');

    document.body.append(textarea);
  };

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
        tagSpan.setAttribute('id', `${arrayKeyCode[i][j]}`);
        tagA.append(tagSpan);
      }
    }
  };

  const paintLettersOnKeyboard = () => {
    arrayButtons = getMatrix(`${currentLanguage}`);

    // turn the two-dimensional array into the one-dimensional
    const arrayButtonsRow = [].concat(...arrayButtons);
    const arrTagSpan = document.querySelectorAll('span');
    for (let i = 0; i < arrTagSpan.length; i++) {
      if (capsLock) {
        arrTagSpan[i].innerText = `${arrayButtonsRow[i].toUpperCase()}`;
      } else {
        arrTagSpan[i].innerText = `${arrayButtonsRow[i]}`;
      }
    }
  };
 // <audio class="KeyU" src="/src/audio/en/a.mp3">

  createViewTextarea();
  createViewKeyboard();
  paintLettersOnKeyboard();

  document.querySelector('#CapsLock')
    .classList
    .remove('active');

  const changeViewTextarea = (pressedKeyValue) => {
    const TextInsideTextarea = document.querySelector('textarea');

    if ((pressedKeyValue === 'Backspace') && (TextInsideTextarea.selectionStart !== 0)) {
      TextInsideTextarea.setRangeText('', TextInsideTextarea.selectionStart - 1, TextInsideTextarea.selectionEnd);
    } else if (pressedKeyValue === 'Delete') {
      TextInsideTextarea.setRangeText('', TextInsideTextarea.selectionStart, TextInsideTextarea.selectionEnd + 1);
    } else if ((pressedKeyValue === 'Backspace') && (TextInsideTextarea.selectionStart === 0)) {
    } else {
      TextInsideTextarea.value += `${pressedKeyValue}`;
    }
  };

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
    changeViewTextarea(pressedKeyValue);
    console.log(pressedKeyValue);
    const audio = document.querySelector('audio');
    audio.src = `src/audio/${currentLanguage}/${pressedKeyValue}.mp3`;
    audio.play();
  });


  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    document.querySelector(`#${event.code}`)
      .classList
      .remove('active');
  });

  document.addEventListener('mousedown', (event) => {
    const mouseKeyCode = event.target.id;
    let pressedKeyValue = '';

    switch (mouseKeyCode) {
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
      case ('MetaLeft'):
        if (currentLanguage === 'en') {
          currentLanguage = 'ru';
        } else {
          currentLanguage = 'en';
        }
        paintLettersOnKeyboard();
        localStorage.setItem('currentLanguage', `${currentLanguage}`);
        break;
      case ('ControlLeft'):
      case ('ControlRight'):
      case ('AltLeft'):
      case ('AltRight'):
      case ('ShiftLeft'):
      case ('ShiftRight'):
      case (''):
      case ('textarea'):
      case ('keyboard'):
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
      case ('info'):
        break;
      default:
        pressedKeyValue = document.querySelector(`#${mouseKeyCode}`).childNodes[0].textContent;
    }
    changeViewTextarea(pressedKeyValue);
  });

  document.addEventListener('click', () => {
    document.getElementById('textarea')
      .focus();
  });

  const keyboard = document.querySelector('#keyboard');
  const checkbox = document.querySelector('#checkbox');

  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      keyboard.style.display = 'none';
    } else {
      keyboard.style.display = 'block';
    }
  });

};
