import GLObject from '../GLObject'

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
            points: object.va
        };
        data.objects.push(objectData);
    });

    let jsonData = JSON.stringify(data);

    download(jsonData, 'model.json', 'text/plain');
}