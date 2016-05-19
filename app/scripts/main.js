var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2;

var baseUrl = 'http://rockiey.github.io/learn-hiragana';

var color = d3.scale.category10();
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var plane = svg.append("path")
                   .attr("class", "plane")
                   .attr("d", "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z")
                   .attr("transform", "translate(" + 0 + "," + 100 + ") scale(5)")
                   .attr("fill", '#ff7f0e');

var currentKanas = [];

var timer;
var updateKana = function () {
  for (var i = 0; i < currentKanas.length; ++i) {
    var kana = currentKanas[i];
    kana.y += 40;
    kana.text.attr("transform", "translate(" + kana.x + "," + kana.y + ")");
  }
}

var colorIndex = 0;

var addKana = function() {
  updateKana();
  if (currentKanas.length > 0) {
    var first = currentKanas[0];
    console.log(first.y);
    if (first.y > 100) {
      clearInterval(timer);
      new Audio(baseUrl + '/sound/95084__nakina4__i-will-never-die.wav').play();
    }
  }
  var x = Math.floor(Math.random() * 200);
  var y = -320;
  var kana = kanas[Math.floor(Math.random()*kanas.length)];
  
  var text = svg.append("text").text(kana)
    .attr('font-size', '40px')
    .attr('fill', color(colorIndex))
    .attr("transform", "translate(" + x + "," + y + ")");

  colorIndex = (colorIndex + 1) % 10;
  currentKanas.push({
    x: x,
    y: y,
    text: text,
    kana: kana
  });
}

var interval = 1000;

timer = setInterval(addKana, interval);


var bullet = svg.append("text").text('')
  .attr('font-size', '40px')
  .attr('fill', '#1f77b4')
  .attr("transform", "translate(" + 100 + "," + 120 + ")")

// var fall = svg.append("text").text('あ')
//   .attr('font-size', '50px')
//   .attr('fill', '#1f77b4')
//   .attr("transform", "translate(" + 100 + "," + -270 + ")")

// var fall2 = svg.append("text").text('い')
//   .attr('font-size', '50px')
//   .attr('fill', '#1f77b4')
//   .attr("transform", "translate(" + 60 + "," + -320 + ")")

var shoot = function(kana) {
  if (currentKanas.length > 0) {
    var first = currentKanas[0];
    if (first.kana === kana) {
      
      new Audio(baseUrl + '/sound/267341__coolguy244e__bullet-hit.mp3').play();
      first.text.attr('class', "shot");
      d3.selectAll('.shot').remove();
      currentKanas.shift();
    } else {
      
      new Audio(baseUrl + '/sound/68449__cdrk__broken-bottle-01.wav').play();
      // new Audio('sound/121655__halleck__metal-crash-1.wav').play();
    }
  }
}

var romaji = '';

d3.select("body").on("keydown", function () { 
  var ch = String.fromCharCode(d3.event.keyCode).toLowerCase();

  var choice = romaji + ch;

  if (choice in monographsMap) {
    var kana = monographsMap[choice];
    romaji = '';
    bullet.text(kana);
    shoot(kana);
    return;
  }

  // there are still chance for append next char
  if (choice in possibleRomaji) {
    romaji = choice;
    return;
  } else {

  }
  

  if (ch in monographsMap) {
    var kana = monographsMap[ch];
    romaji = '';
    bullet.text(kana);
    shoot(kana);
    return;
  }

});

new Audio(baseUrl + '/sound/21741__erdie__car-start.mp3').play();


// var bullet = svg.append('svg:image')
//    .attr('x',100)
//    .attr('y',100)
//    .attr('width', 15)
//    .attr('height', 33)
//    .attr("xlink:href","bullet.png")