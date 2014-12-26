function resetSearch ($row, bgColor) {

  setTimeout(function() {
    $row.css({
      background: bgColor
    });
  },3000);
}

function search (){
  $('.navbar-form').on('submit',function(e){
    var $row = $( '#' + $('.search-input').val() );
    var bgColor = $row.css('background');

    // highlight row
    $row.css({
      background: 'red'
    });

    // scroll to row
    $('html, body').animate({
      scrollTop: ($row.offset().top - 110)
    }, 1000);

    // prevent submit default behavior
     e.preventDefault();
    //
    // remove background within 3 seconds
    resetSearch($row, bgColor);
  });
}

module.exports = search;
