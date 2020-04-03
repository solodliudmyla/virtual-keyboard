window.onload = function onLoad() {

  let createKeyboard = () => {

    const getMatrix = (language) => {
      const matrix = {
        en: [
          ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete'],
          ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
          ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
          ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
          ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift'],
          ['Ctrl', 'Win', 'Alt', 'space', 'Alt', 'Ctrl', '&#9666;', '&#9652;', '&#9662;', '&#9656;']
        ],
        ru: [
          ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+backspace'],
          ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '-'],
          ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '+'],
          ['@', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё', '.', '_'],
          ['+shift', '+space', '+international']
        ]
      };
      return matrix[language];
    };
    let arrayButtons = getMatrix('en');

    let createVewKeyboard = () => {
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
          tagA.setAttribute('id', `id-${i}-${j}`);
          if (i === 0) {tagA.setAttribute('class', 'key fn')}
          tagLi.append(tagA);
          let tagSpan = document.createElement('span');
          tagSpan.innerHTML = arrayButtons[i][j];
          tagA.append(tagSpan);
        }
      }
    };
    createVewKeyboard();
  };
  createKeyboard();
};


/*
 changeLangClickHandler = () => {};
 EnterClickHandler = () => {};
 TabClickHandler = () => {};
 DeleteClickHandler = () => {};
 BackspaceClickHandler = () => {};
 ArrowClickHandler = () => {};
 */

