import { initShaderFiles } from './utils/shader';
import GLObject from './GLObject';
import Polygon from './Polygon';
import Renderer from './renderer';

const Tool = {
    "DRAW" : 0,
    "MOVE" : 1
}

const Shape = {
    "LINE" : 0,
    "SQUARE" : 1,
    "POLYGON" : 2
}

window.onload = function() {
    var canvas = document.getElementById('gl-canvas') as HTMLCanvasElement;
    canvas.width = 400;
    canvas.height = 400;
    
    var gl = canvas.getContext('webgl2') as WebGL2RenderingContext;

    var objects : GLObject[] = [];

    // html element reference
    var toolPicker = document.getElementById('tool-picker') as HTMLSelectElement;
    var shapePicker = document.getElementById('shape-picker') as HTMLSelectElement;
    var colorPicker = document.getElementById('color-picker') as HTMLInputElement;

    // tool variables
    var currentTool : number;
    var currentShape : number;
    var currentColor : number[];
    var selectedObject : GLObject;
    var selectedPoint : number;

    // input variables
    var mouseIsDown;

    toolPicker.onclick = function () {
        currentTool = toolPicker.selectedIndex;
    };
    shapePicker.onclick = function () {
        currentShape = shapePicker.selectedIndex;
    };
    colorPicker.oninput = function () {
        const colStr = colorPicker.value.match(/[\d\w]{1,2}/g);
        currentColor = [
            parseInt(colStr[0], 16)/255,
            parseInt(colStr[1], 16)/255,
            parseInt(colStr[2], 16)/255,
            1
        ]
    };

    async function main() {
        if (!gl) {
            alert('Your browser does not support WebGL')
            return
        };
        
        const triangleData = [
            200.0, 200.0,
            400.0, 200.0,
            200.0, 400.0
        ];

        const shaderProgram = await initShaderFiles(gl, 'vert.glsl', 'frag.glsl');
        const yellowShader = await initShaderFiles(gl, 'vert.glsl', 'frag-yellow.glsl');

        gl.viewport(0,0, gl.canvas.width, gl.canvas.height);

        
        const renderer = new Renderer()
        
        // const glObject = new GLObject(0, shaderProgram, gl)
        // glObject.setVertexArray(triangleData)
        // glObject.setColorArray([1.0, 0.0, 0.0, 1.0])
        // renderer.addObject(glObject)
        
        // const glObject2 = new GLObject(1, shaderProgram, gl)
        // glObject2.setVertexArray([400, 0, 400, 200, 200, 0])
        // glObject2.setPoints([400, 0, 400, 200, 200, 0])
        // glObject2.setColorArray([0.0, 1.0, 0.0, 1.0])
        // renderer.addObject(glObject2)
        // objects.push(glObject2);
        
        // const glObject3 = new GLObject(1, shaderProgram, gl)
        // glObject3.setVertexArray([200, 200, 0, 200, 200, 0])
        // glObject3.setColorArray([0.0, 0.0, 1.0, 1.0])
        // renderer.addObject(glObject3)
        
        // const glObject4 = new GLObject(1, shaderProgram, gl)
        // glObject4.setVertexArray([0, 400, 0, 200, 200, 400])
        // glObject4.setColorArray([1.0, 1.0, 0.0, 1.0])
        // renderer.addObject(glObject4)

        const glObject5 = new Polygon(1, shaderProgram, gl);
        glObject5.setPoints([100, 50, 300, 50, 370, 250, 200, 370, 30, 250]);
        glObject5.setColorArray([0.251, 0.624, 1.0, 1.0]);
        renderer.addObject(glObject5);
        objects.push(glObject5);
        
        function render(now: number) {
            gl.clearColor(1,1,1,1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            renderer.render();
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }
    
    main()

    canvas.onmousedown = function (event) {
        const bound = canvas.getBoundingClientRect();
        const mousePos = {
            x: event.clientX - bound.left,
            y: bound.bottom - event.clientY
        };
        console.log(mousePos);

        if (currentTool === Tool.MOVE) {
            onMoveStart(mousePos);
        }
    
        mouseIsDown = true;
    }

    canvas.onmousemove = function(event){
        const bound = canvas.getBoundingClientRect();
        const mousePos = {
            x: event.clientX - bound.left,
            y: bound.bottom - event.clientY
        };

        // On Mouse Move (regardless of mouse down)

        if(!mouseIsDown) return;

        // On Drag
        if (currentTool === Tool.MOVE) {
            onMoveHold(mousePos);
        }

        return;
    }

    canvas.onmouseup = function(event){
        // if(mouseIsDown) mouseClick(e);
    
        mouseIsDown = false;
    }

    function onDrawStart(mousePos : { x:number, y:number }) {
        if (currentShape === Shape.POLYGON) {
            
        }
    }

    function onMoveStart(mousePos : { x:number, y:number }) {
        const nearestDistance = 30;
        let nearestDistanceSquared: number = nearestDistance * nearestDistance;
        let nearestObject: GLObject;
        let nearestPoint: number;
        
        objects.forEach(object => {
            for (let i = 0; i < object.pts.length / 2; i++) {
                console.log("test");
                const pt = { x: object.pts[2*i], y: object.pts[2*i+1] };
                let distanceSquared = Math.pow(mousePos.x - pt.x, 2) + Math.pow(mousePos.y - pt.y, 2);
                if (nearestDistanceSquared > distanceSquared) {
                    nearestDistanceSquared = distanceSquared;
                    nearestObject = object;
                    nearestPoint = i;
                }
            }
        });

        selectedObject = nearestObject;
        selectedPoint = nearestPoint;

        console.log("Nearest Object: " + nearestObject + " Nearest point: " + nearestPoint);
    }

    function onMoveHold(mousePos : { x:number, y:number }) {
        if (selectedObject !== undefined) {
            selectedObject.onPointDrag(selectedPoint, mousePos);
        }
    }
}