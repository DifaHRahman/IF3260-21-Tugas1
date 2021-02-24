import GLObject from './GLObject';

class Polygon extends GLObject {
    getDrawType() {
        return this.gl.TRIANGLE_FAN;
    }

    getObjectType() : string {
        return "Polygon";
    }
}

export default Polygon;