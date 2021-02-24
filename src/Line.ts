import GLObject from './GLObject';

class Line extends GLObject{

    getDrawType(){
        return this.gl.LINES;
    }

    getObjectType() : string {
        return "Line";
    }
}

export default Line;