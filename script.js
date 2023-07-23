
let numberOfBoxes = 16*16;

const boxContainer = document.querySelector('#box-container')



for (let i = 0;i < numberOfBoxes; i++) {
    const newBox = document.createElement('div');
    newBox.classList.add('box')
    boxContainer.append(newBox);
}