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

  let currentLanguage = 'en';
  let arrayKeyCode = getMatrix('code');
  let arrayButtons = getMatrix(`${currentLanguage}`);

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
  let createViewTextarea = () => {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'textarea');
    textarea.setAttribute('id', 'textarea');
    document.body.append(textarea);
  };
  let changeViewKeyboard = () => {
    arrayButtons = getMatrix(`${currentLanguage}`);
    let arrayButtonsRow = [].concat(...arrayButtons);

    let arrTagSpan = document.querySelectorAll('span');
    for (let i = 0; i < arrTagSpan.length; i++) {
      arrTagSpan[i].innerText = `${arrayButtonsRow[i]}`;

    }
  };


  createViewTextarea();
  createViewKeyboard();

  document.addEventListener('keydown', (event) => {
      event.preventDefault();
      let pressedKey = document.querySelector(`#${event.code}`).classList.add('active');

      if (event.altKey && event.ctrlKey) {
        if (currentLanguage === 'en') {
          currentLanguage = 'ru';
        } else currentLanguage = 'en';
        changeViewKeyboard();
      }

    }
  );
  document.addEventListener('keyup', (event) => {
      event.preventDefault();
      let pressedKey = document.querySelector(`#${event.code}`).classList.remove('active');
    }
  );


};
/*
 changeLangClickHandler = () => {};
 EnterClickHandler = () => {};
 TabClickHandler = () => {};
 DeleteClickHandler = () => {};
 BackspaceClickHandler = () => {};
 ArrowClickHandler = () => {};
 */

