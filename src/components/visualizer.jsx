import React from 'react';
import Navbar from './navbar';
import Frame from './frame';
import Footer from './footer';
import pause from './helper/pause';
import generator from './helper/generator';
import { ALGORITHM, SPEED, SIZE, SWAP, CURRENT, NORMAL, DONE } from './helper/constants';
import { getKeysCopy } from './helper/keys';
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  heapSort,
} from './algorithms';

class Visualizer extends React.Component {
  state = {
    list: [],
    size: 5,
    speed: 1,
    algorithm: 1,
    running: false,
  };

  componentDidMount() {
    this.generateList();
  }

  componentDidUpdate() {
    this.onChange();
    this.generateList();
  }

  render() {
    return (
      <>
        <Navbar
          start={this.start}
          response={this.response}
          newList={this.generateList}
          onChange={this.onChange}
        />
        <Frame list={this.state.list} />
        <Footer />
      </>
    );
  }

  onChange = (value, option) => {
    if (option === ALGORITHM && !this.state.running) {
      this.setState({ algorithm: Number(value) });
    } else if (option === SPEED) {
      this.setState({ speed: Number(value) });
    } else if (option === SIZE && !this.state.running) {
      this.setState({ size: Number(value) });
      this.generateList();
    }
  };

  generateList = (value = 0) => {
    if ((this.state.list.length !== this.state.size && !this.state.running) || Number(value) === 1) {
      this.setState({ list: generator(this.state.size) });
    }
  };

  start = async () => {
    this.lock(true);
    const moves = await this.getMoves(this.state.algorithm);
    await this.visualizeMoves(moves);
    await this.done();
    this.lock(false);
  };

  getMoves = async (algorithm) => {
    const array = await getKeysCopy(this.state.list, this.state.size);
    const algorithms = [bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort];
    return algorithms[algorithm - 1](array, array.length);
  };

  visualizeMoves = async (moves) => {
    if (!moves.length) return;
    if (moves[0].length === 4) {
      await this.visualizeRangeMoves(moves);
    } else {
      await this.visualizeSwapMoves(moves);
    }
  };

  visualizeRangeMoves = async (moves) => {
    let prevRange = [];
    while (moves.length && moves[0].length === 4) {
      if (prevRange !== moves[0][3]) {
        await this.updateElementClass(prevRange, NORMAL);
        prevRange = moves[0][3];
        await this.updateElementClass(moves[0][3], CURRENT);
      }
      await this.updateElementValue([moves[0][0], moves[0][1]]);
      moves.shift();
    }
    await this.visualizeMoves(moves);
  };

  visualizeSwapMoves = async (moves) => {
    while (moves.length) {
      const [i, j, type] = moves.shift();
      await this.updateElementClass([i, j], CURRENT);
      if (type === SWAP) {
        await this.swapElements(i, j);
      }
      await this.updateElementClass([i, j], NORMAL);
    }
  };

  swapElements = async (i, j) => {
    const list = [...this.state.list];
    [list[i].key, list[j].key] = [list[j].key, list[i].key];
    await this.updateState(list);
  };

  updateElementValue = async ([index, value]) => {
    const list = [...this.state.list];
    list[index].key = value;
    await this.updateState(list);
  };

  updateElementClass = async (indexes, classType) => {
    const list = [...this.state.list];
    indexes.forEach((index) => (list[index].classType = classType));
    await this.updateState(list);
  };

  updateState = async (list) => {
    this.setState({ list });
    await pause(this.state.speed);
  };

  lock = (running) => {
    this.setState({ running });
  };

  done = async () => {
    await this.updateElementClass([...Array(this.state.size).keys()], DONE);
  };

  response = () => {
    const navbar = document.querySelector('.navbar');
    navbar.className = navbar.className === 'navbar' ? 'navbar responsive' : 'navbar';
  };
}

export default Visualizer;
