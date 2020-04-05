window.onload = function onLoad() {

  const getMatrix = (language) => {
    const matrix = {
      code: [
        ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete'],
        ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
        ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
        ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight']
      ],
      en: [
        ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete'],
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
        ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
        ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
        ['Ctrl', 'Win', 'Alt', 'space', 'Alt', 'Ctrl', '◄', '▲', '▼', '►']
      ],
      ru: [
        ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete'],
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
        ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
        ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
        ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'shift'],
        ['Ctrl', 'Win', 'Alt', 'space', 'Alt', 'Ctrl', '◄', '▲', '▼', '►']
      ]
    };
    return matrix[language];
  };

  let currentLanguage = localStorage.getItem('currentLanguage');
  if (currentLanguage === null) {
    currentLanguage = 'en';
  }

  let arrayKeyCode = getMatrix('code');
  let arrayButtons = getMatrix(`${currentLanguage}`);

  let createInformationArea = () => {
    const controlKeysLanguageText = document.createElement('p');
    controlKeysLanguageText.setAttribute('id', 'info');
    controlKeysLanguageText.innerHTML = `Сочетание клавиш: Ctrl + Alt <br>Клавиатура создавалась в Windows`;
    document.body.append(controlKeysLanguageText);
  };
  let createViewTextarea = () => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'textarea');
    textarea.setAttribute('id', 'textarea');
    textarea.setAttribute('autofocus', 'autofocus');

    document.body.append(textarea);
  };
  let createViewKeyboard = () => {

    arrayButtons = getMatrix(`${currentLanguage}`);

    const keyboard = document.createElement('div');
    keyboard.setAttribute('id', 'keyboard');
    document.body.append(keyboard);

    for (let i = 0; i < 6; i++) {
      const keyboardRow = document.createElement('ul');
      keyboardRow.setAttribute('class', 'cf');
      keyboard.append(keyboardRow);

      for (let j = 0; j < arrayButtons[i].length; j++) {
        let tagLi = document.createElement('li');
        keyboardRow.append(tagLi);
        let tagA = document.createElement('a');
        tagA.setAttribute('class', 'key');
        tagA.setAttribute('id', `${arrayKeyCode[i][j]}`);
        if (i === 0) {
          tagA.setAttribute('class', 'key fn');
        }
        tagLi.append(tagA);
        let tagSpan = document.createElement('span');
        tagSpan.innerHTML = arrayButtons[i][j];
        tagA.append(tagSpan);
      }
    }
  };

  let changeViewKeyboard = () => {
    arrayButtons = getMatrix(`${currentLanguage}`);
    let arrayButtonsRow = [].concat(...arrayButtons); // turn the two-dimensional array into the one-dimensional

    let arrTagSpan = document.querySelectorAll('span');// get the one-dimensional array
    for (let i = 0; i < arrTagSpan.length; i++) {
      arrTagSpan[i].innerText = `${arrayButtonsRow[i]}`;

    }
  };
  let changeViewTextarea = (pressedKeyValue) => {
    let TextInsideTextarea = document.querySelector('#textarea');
    if (pressedKeyValue === 'Backspace') {
      TextInsideTextarea.setRangeText('', TextInsideTextarea.selectionStart - 1, TextInsideTextarea.selectionEnd);
    } else if (pressedKeyValue === 'Delete') {
      TextInsideTextarea.setRangeText('', TextInsideTextarea.selectionStart, TextInsideTextarea.selectionEnd + 1);
    } else {
      TextInsideTextarea.value += `${pressedKeyValue}`;
    }


  };

  createInformationArea();
  createViewTextarea();
  createViewKeyboard();

  document.addEventListener('keydown', (event) => {
    event.preventDefault();

   document.querySelector(`#${event.code}`).classList.add('active'); // add colour and animation effect

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
      case ('ControlLeft'):
      case ('ControlRight'):
      case ('AltLeft'):
      case ('AltRight'):
      case ('ShiftLeft'):
      case ('ShiftRight'):
        break;
      default:

        pressedKeyValue = document.querySelector(`#${event.code}`).childNodes[0].textContent;
}
 if (event.altKey && event.ctrlKey) {
      if (currentLanguage === 'en') {
        currentLanguage = 'ru';
      } else currentLanguage = 'en';
      changeViewKeyboard();
      localStorage.setItem('currentLanguage', `${currentLanguage}`);
    }
    changeViewTextarea(pressedKeyValue);
  });
  document.addEventListener('keyup', (event) => {
      event.preventDefault();
      let pressedKey = document.querySelector(`#${event.code}`).classList.remove('active');
    });
  document.addEventListener('mousedown', (event) => {
    event.preventDefault();

    let mouseKeyCode=event.target.id;
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
      case ('ControlLeft'):
      case ('ControlRight'):
      case ('AltLeft'):
      case ('AltRight'):
      case ('ShiftLeft'):
      case ('ShiftRight'):
      case (''):
      case ('MetaLeft'):
      case ('textarea'):
        break;
      default:
        pressedKeyValue = document.querySelector(`#${mouseKeyCode}`).childNodes[0].textContent;
    }
        changeViewTextarea(pressedKeyValue);
  });


};