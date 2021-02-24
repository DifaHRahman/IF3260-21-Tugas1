import GLObject from "./GLObject";

class Square extends GLObject {
  getDrawType() {
    return this.gl.TRIANGLE_FAN;
  }

  onPointDrag(point: number, position: { x: number; y: number }) {
    let heightDiff = position.y - this.va[point * 2 + 1];

    let idxSideX = this.sidePointX(point);
    let idxSideY = this.sidePointY(point);

    // console.log(this.va);
    let curr_x = this.va[point * 2];
    let curr_y = this.va[point * 2 + 1];
    let side_x = this.va[idxSideX];
    let side_y = this.va[idxSideY + 1];

    let idx = this.searchIndex(point);
    let isUpightDownleft =
      (curr_x > side_x && curr_y > side_y) ||
      (curr_x < side_x && curr_y < side_y);

    if (isUpightDownleft) {
      console.log("atas kanan atau kiri bawah yuhu");
    } else {
      heightDiff = -heightDiff;
    }

    if (idx != -1) {
      this.va[idx] += heightDiff;
      this.va[idx + 1] = position.y;
    }
    this.va[point * 2] += heightDiff;
    this.va[point * 2 + 1] = position.y;

    if (this.searchIndex(idxSideX / 2) != -1) {
      this.va[this.searchIndex(idxSideX / 2) + 1] = position.y;
    }
    this.va[idxSideX + 1] = position.y;

    if (this.searchIndex(idxSideY / 2) != -1) {
      this.va[this.searchIndex(idxSideY / 2)] += heightDiff;
    }
    this.va[idxSideY] += heightDiff;
  }

  searchIndex(point: number) {
    let index = 0;
    let found = -1;

    let array = this.va;

    let position_x = array[point * 2];
    let position_y = array[point * 2 + 1];

    while (index < array.length) {
      if (
        array[index] == position_x &&
        array[index + 1] == position_y &&
        index / 2 != point
      ) {
        found = 1;
        return index;
      }
      index += 2;
    }
    if (found == -1) {
      return found;
    }
  }

  sidePointY(point: number) {
    let index = 0;
    let found = -1;

    let array = this.va;

    let position_x = array[point * 2];
    let position_y = array[point * 2 + 1];

    while (index < array.length) {
      if (
        array[index] == position_x &&
        array[index + 1] != position_y &&
        index / 2 != point
      ) {
        found = 1;
        // console.log("SIDE Y CUY");
        // console.log(this.va[index], this.va[index + 1]);
        return index;
      }
      index += 2;
    }
    if (found == -1) {
      return -1;
    }
  }

  sidePointX(point: number) {
    let index = 0;
    let found = -1;

    let array = this.va;

    let position_x = array[point * 2];
    let position_y = array[point * 2 + 1];

    while (index < array.length) {
      if (
        array[index] != position_x &&
        array[index + 1] == position_y &&
        index / 2 != point
      ) {
        found = 1;
        // console.log("SIDE X CUY");
        // console.log(this.va[index], this.va[index + 1]);
        return index;
      }
      index += 2;
    }
    if (found == -1) {
      return found;
    }
  }
}

export default Square;
