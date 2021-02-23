import GLObject from './GLObject';

class Polygon extends GLObject {
    
    setPoints(pts : number[]) {
        this.pts = pts;
        this.va = new Array<number>(pts.length);
        let m = 0;
        let n = this.pts.length / 2 - 1;
        let i = 0;
        while (m <= n) {
            this.va[i] = pts[m*2];
            this.va[i+1] = pts[m*2+1];
            m++;
            if (m <= n) {
                this.va[i+2] = pts[n*2];
                this.va[i+3] = pts[n*2+1];
                n--;
            }
            i+=4;
        }
        console.log(this.pts);
        console.log(this.va);
    }

    getDrawType() {
        return this.gl.TRIANGLE_STRIP;
    }

    onPointDrag(point: number, position: {x : number, y : number}) {
        this.pts[point * 2] = position.x;
        this.pts[point * 2 + 1] = position.y;

        let index;
        if (point <= (this.pts.length / 4)) {
            index = point * 4;
            console.log("first " + index);
        } else {
            index = (this.pts.length - point * 2 - 2) * 2 + 2;
            console.log("second " + index);
        }
        
        this.va[index] = position.x;
        this.va[index + 1] = position.y;
    }
}

export default Polygon;