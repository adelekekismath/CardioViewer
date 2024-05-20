import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = require('hammerjs');

// Initialize the cornerstone enabled element
const element = document.getElementById('dicomImage');
cornerstone.enable(element);

document.getElementById('fileInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        loadAndViewDicomFile(file);
    }
});

const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', function (e) {
    e.preventDefault();
});

dropZone.addEventListener('drop', function (e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        loadAndViewDicomFile(files[0]);
    }
});

function loadAndViewDicomFile(file) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const arrayBuffer = event.target.result;
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
        cornerstone.loadImage(imageId).then(function (image) {
            cornerstone.displayImage(element, image);
        });
    };
    fileReader.readAsArrayBuffer(file);
}
