import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { delay } from '../utils';

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
`;

// const SortOptions = styled.div`
//   display: flex;
//   padding: 0px 3px;
// `;

const Text = styled.p`
  padding: 0px 12px;
`;

const SortContainer = styled.div`
  display: flex;
  padding: 0px 3px;
  justify-content: center;
`;

function Visualizer() {
  var [arr, setArr] = useState([]);
  var [arrSize, setArrSize] = useState(70);
  let delayTime = 1;

  const resetArr = useCallback(() => {
    const array = [];
    for (var i = 0; i < arrSize; i++) {
      array.push(Math.floor(Math.random() * (720 - 1 + 1) + 1));
    }
    setArr(array);
  }, [arrSize]);

  const resizeArr = (size) => {
    setArrSize(size);
  };

  useEffect(() => {
    resetArr();
  }, [resetArr]);

  const swap = (array, x, y) => {
    var temp = array[x];
    array[x] = array[y];
    array[y] = temp;
    return array;
  };

  const bubbleSort = async () => {
    let array = arr;
    var elem = document.querySelectorAll('.array-bar');
    delayTime = 1;

    let i, j;
    for (i = 0; i < arrSize - 1; i++) {
      for (j = 0; j < arrSize - i - 1; j++) {
        elem[j].style.backgroundColor = 'orange';
        elem[j + 1].style.backgroundColor = 'orange';
        await delay(delayTime);

        if (array[j] > array[j + 1]) {
          array = swap(array, j, j + 1);
          elem[j].style.height = `${array[j]}px`;
          elem[j + 1].style.height = `${array[j + 1]}px`;
        }
        elem[j].style.backgroundColor = 'gray';
        await delay(delayTime);
      }
      elem[j].style.backgroundColor = 'purple';
      await delay(delayTime);
    }
    elem[0].style.backgroundColor = 'purple';
    await delay(delayTime);

    setArr(array);
  };

  const selectionSort = async () => {
    let array = arr;
    var elem = document.querySelectorAll('.array-bar');
    delayTime = 0.5;

    var i, j, min_idx;

    for (i = 0; i < arrSize - 1; i++) {
      min_idx = i;
      for (j = i + 1; j < arrSize; j++) {
        elem[j].style.backgroundColor = 'orange';
        elem[min_idx].style.backgroundColor = 'orange';
        await delay(delayTime);

        if (array[j] < array[min_idx]) {
          elem[min_idx].style.backgroundColor = 'gray';
          await delay(delayTime);

          min_idx = j;
        } else {
          elem[j].style.backgroundColor = 'gray';
          await delay(delayTime);
        }
      }
      array = swap(array, min_idx, i);

      elem[min_idx].style.height = `${array[min_idx]}px`;
      elem[i].style.height = `${array[i]}px`;
      elem[i].style.backgroundColor = 'purple';
      await delay(delayTime);
    }
    elem[arrSize - 1].style.backgroundColor = 'purple';
    await delay(delayTime);

    setArr(array);
  };

  const insertionSort = async () => {
    let array = arr;
    var elem = document.querySelectorAll('.array-bar');
    delayTime = 10;

    let i, j, key;
    for (i = 1; i < arrSize; i++) {
      key = array[i];
      j = i - 1;

      let n;
      for (n = 0; n <= i; n++) {
        elem[n].style.backgroundColor = 'purple';
      }
      await delay(delayTime);

      elem[i].style.backgroundColor = 'orange';
      elem[j].style.backgroundColor = 'orange';
      await delay(delayTime);

      while (j >= 0 && key < array[j]) {
        elem[i].style.backgroundColor = 'orange';
        elem[j].style.backgroundColor = 'orange';
        await delay(delayTime);

        array[j + 1] = array[j];
        elem[j + 1].style.height = `${array[j + 1]}px`;
        elem[j].style.backgroundColor = 'purple';
        j = j - 1;
        await delay(delayTime);
      }
      array[j + 1] = key;
      elem[j + 1].style.height = `${array[j + 1]}px`;
      elem[j + 1].style.backgroundColor = 'purple';
      await delay(delayTime);
    }

    let n;
    for (n = 0; n < arrSize; n++) {
      elem[n].style.backgroundColor = 'purple';
    }

    setArr(array);
  };

  return (
    <Container>
      <Header>
        <h1>VISUSORT</h1>
        <p onClick={resetArr}>NEW ARRAY</p>
        <Text>|</Text>
        <p>ARRAY SIZE</p>
        <div className="slidecontainer">
          <input
            type="range"
            min="5"
            max="239"
            className="slider"
            id="myRange"
            value={arrSize}
            onChange={(e) => resizeArr(e.target.value)}
          />
        </div>
        <Text>|</Text>
        <Text onClick={bubbleSort}>BUBBLE SORT</Text>
        <Text>|</Text>
        <Text onClick={selectionSort}>SELECTION SORT</Text>
        <Text>|</Text>
        <Text onClick={insertionSort}>INSERTION SORT</Text>
      </Header>
      <SortContainer>
        {arr.map((val, idx) => (
          <div
            key={idx}
            style={{
              padding: '0px 1px',
            }}
          >
            <div
              className="array-bar"
              style={{
                backgroundColor: 'gray',
                height: `${val}px`,
                width: '4px',
              }}
            ></div>
          </div>
        ))}
      </SortContainer>
    </Container>
  );
}

export default Visualizer;
