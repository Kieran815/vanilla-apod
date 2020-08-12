// ROUND 2: remove jquery and implement vanilla js

//https://api.nasa.gov/planetary/apod?api_key=hLIBzAg75PshqSDBEy2EBsFBdxm3GAA2iUTcNozJ


// apod is an object, init is a function
var apod = {

  randomDate: function(start, end) {
    // randomize date
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    // format date
    let d = date.getDate();
    // months are still 0 index; add 1 to get regular month int
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    // format month to 2 digits
    if (m < 10) {
      // add 0 as string if <10
      m = '0' + m;
    }

    // format date to 2 digits
    if (d < 10) {
      d = '0' + d
    }

    return `${y}-${m}-${d}`
  },

  
  buildDOM: function(result) {
    document.getElementById('#apodTitle').innerHTML = result.title;

    if (result.media_type === 'video') {
      // hide apodImg and show apodVideo in an iframe
      document.querySelector('#apodImg').style.display = 'none';
      let avi = document.querySelector('#apodVideo > iframe');
      avi.src = result.url;
      document.querySelector('#apodVideo').style.display = 'block';
    } else {
      // hide apodVideo and show apodImg
      document.querySelector('#apodVideo').style.display = 'none';
      let ai = document.querySelector('#apodImg');
      ai.src = result.url;
      ai.style.display = 'block';
    }

    if (result.copyright != undefined) {
      document.querySelector('#apodCopyright').innerHTML = 'Copyright: ' + result.copyright;
    }

    document.querySelector('#apodDate').innerHTML = 'Date: ' + result.date;
    document.querySelector('#apodDesc').innerHTML = result.explanation;
  },

  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let key = 'hLIBzAg75PshqSDBEy2EBsFBdxm3GAA2iUTcNozJ'
    const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function() {
      let result = JSON.parse(xhr.response);
      _this.buildDOM(result);
    }
  },
  
  init: function() {
    this.getRequest();
  }
}
// call apod function init
apod.init();

document.querySelector('#btnRandApod').addEventListener('click', function(){
  apod.getRequest();
});