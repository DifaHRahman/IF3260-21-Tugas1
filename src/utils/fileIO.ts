import GLObject from '../GLObject'
import Line from '../Line';
import Square from '../Square';
import Polygon from '../Polygon';
import Renderer from '../renderer';

// https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

export async function saveJSON(objects : GLObject[]) {
    let data = {
        objects: []
    };

    objects.forEach(object => {
        let objectData = {
            id: object.id,
            type: (object.getObjectType()),
            points: object.va,
            color: object.col
        };
        data.objects.push(objectData);
    });

    let jsonData = JSON.stringify(data);

    download(jsonData, 'model.json', 'text/plain');
}

export async function loadJSON(file : File, objects : GLObject[], shader : WebGLProgram, gl : WebGL2RenderingContext, rend : Renderer) {
    // Check if the file is an image.
    if (file.type && file.type.indexOf('json') === -1) {
        console.log('File is not an JSON.', file.type, file);
        return;
    }



    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        console.log(atob(event.target.result.toString().match(/(?<=base64,).*/).toString()));

        let data = JSON.parse(atob(event.target.result.toString().match(/(?<=base64,).*/).toString()));

        objects.length = 0;
        rend.objectList.length = 0;

        let i = 0;
        data.objects.forEach(element => {
            let object : GLObject;
            if (element.type == "Line") {
                object = new Line(i, shader, gl);
            } else if (element.type == "Square") {
                object = new Square(i, shader, gl);
            } else if (element.type == "Polygon") {
                object = new Polygon(i, shader, gl);
            }
            object.setVertexArray(element.points);
            console.log(element.color)
            object.setColorArray(element.color);
            rend.addObject(object);
            objects.push(object);
            i++;
        });
        console.log(objects);
    });
    reader.readAsDataURL(file);
}