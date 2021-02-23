class GLObject {
    public id: number;
    public va: number[];
    public shader: WebGLProgram;
    public gl: WebGL2RenderingContext;
    public col: number[];
    public pts: number[];

    constructor(id: number, shader: WebGLProgram, gl: WebGL2RenderingContext) {
        this.id = id;
        this.shader = shader;
        this.gl = gl;
        this.col = [1.0, 1.0, 1.0, 1.0];
    }

    getDrawType() {
        return this.gl.TRIANGLES;
    }

    setPoints(pts: number[]) {
        this.pts = pts;
        this.va = pts;
    }

    setVertexArray(va: number[]) {
        this.va = va;
    }

    setColorArray(col: number[]) {
        this.col = col;
    }

    onPointDrag(point: number, position: {x : number, y : number}) {
        this.pts[point * 2] = position.x;
        this.pts[point * 2 + 1] = position.y;
        this.va[point * 2] = position.x;
        this.va[point * 2 + 1] = position.y;
    }

    bind() {
        const gl = this.gl
        const vbo = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.va), gl.STATIC_DRAW)
    }

    draw() {
        const gl = this.gl;
        gl.useProgram(this.shader);
        const u_resolution = gl.getUniformLocation(this.shader, "u_resolution");
        gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);
        var vertexPos = gl.getAttribLocation(this.shader, 'a_pos');
        var uniformCol = gl.getUniformLocation(this.shader, 'u_fragColor');
        gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0);
        gl.uniform4fv(uniformCol, this.col);
        gl.enableVertexAttribArray(vertexPos);
        gl.drawArrays(this.getDrawType(), 0, this.va.length/2);
    }
}
  
export default GLObject