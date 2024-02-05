var loadFile = function(event) {
    var image = new Image();
    image.onload = function() {
        document.getElementById('uploadedImage').src = image.src;
        document.getElementById('uploadedImage').style.display = 'block';

        checkAndConvertBadge(image);
    };
    image.src = URL.createObjectURL(event.target.files[0]);
};

var checkAndConvertBadge = function(image) {
    try {
        // Vérifier la taille de l'image (512x512)
        if (image.width === 512 && image.height === 512) {
            // Vérifier si les pixels non transparents sont à l'intérieur d'un cercle
            if (isCircle(image)) {
                // Vérifier si les couleurs donnent une impression de "joie"
                if (areColorsHappy(image)) {
                    displayResult(image, 'Badge vérifié avec succès!');
                } else {
                    alert('Les couleurs du badge ne donnent pas une impression de "joie".');
                }
            } else {
                alert('Les pixels non transparents ne sont pas à l\'intérieur d\'un cercle.');
            }
        } else {
            alert('La taille du badge ne répond pas aux critères (512x512).');
        }
    } catch (error) {
        console.error('Erreur de vérification du badge :', error);
    }
};

var isCircle = function(image) {
    try {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        var imageData = context.getImageData(0, 0, image.width, image.height).data;
        var centerX = image.width / 2;
        var centerY = image.height / 2;
        var radius = image.width / 2;

        for (var i = 0; i < imageData.length; i += 4) {
            var x = (i / 4) % image.width;
            var y = Math.floor((i / 4) / image.width);

            var distanceToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            if (imageData[i + 3] !== 0 && distanceToCenter > radius) {
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error('Erreur lors de la vérification du cercle :', error);
        return false;
    }
};

var areColorsHappy = function(image) {
    try {
        var colorThief = new ColorThief();
        var dominantColor = colorThief.getColor(image);
        var isHappyColor = isVibrantColor(dominantColor);
        return isHappyColor;
    } catch (error) {
        console.error('Erreur lors de la vérification des couleurs :', error);
        return false;
    }
};

var isVibrantColor = function(color) {
    try {
        var red = color[0];
        var green = color[1];
        var blue = color[2];

        return (red > 200 && green < 100 && blue < 100);
    } catch (error) {
        console.error('Erreur lors de la vérification de la couleur vive :', error);
        return false;
    }
};

var displayResult = function(image, message) {
    try {
        // Vous pouvez ajouter le code pour afficher le résultat ici
        console.log(message);
    } catch (error) {
        console.error('Erreur lors de l\'affichage du résultat :', error);
    }
};