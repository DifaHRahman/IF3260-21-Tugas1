import GLObject from './GLObject';

class Line extends GLObject{

    getDrawType(){
        return this.gl.LINES;
    }
}

export default Line;