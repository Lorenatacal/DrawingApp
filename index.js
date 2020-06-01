$(document).ready(function() {
  var imagesUrl = [];
  var randomImage = '';

  function getRandomImage() {
    try {
      $.ajax({
        url: 'https://picsum.photos/v2/list?page=2&limit=100',
        type: 'GET',
        success: function(response) {
          console.log(response)
          response.forEach(element => imagesUrl.push(element.download_url));
          randomImage = imagesUrl[Math.floor(Math.random() * imagesUrl.length)];
          console.log(randomImage)
          $("#randomImage").text(randomImage);
          $('#randomImage').attr('src', randomImage);
        }
      })
    }
    catch(err) {
      alert("err");
    }
  }
  getRandomImage()
});
