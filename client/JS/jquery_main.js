$(document).ready(() => {
  $('#returnButton').hide();

  $.ajax({
    url: 'flowers',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      $('#status').html('Flower objects collected');
      //https://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html
      let table = $("<table/>").addClass('TableGenerator');
      $.each(data, function(rowIndex, r) {
          let row = $("<tr/>").addClass('GeneratorRow');
          $.each(r, function(colIndex, c) {
              row.append($("<td/>").addClass('GeneratorCol').text(c));
          });
          table.append(row);
      });
      $('#flowerTable').append(table);
    }
  });

  $('#returnButton').click(() => {
    $.ajax({
      url: 'flowers',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        $('#status').html('Flower objects collected');
        //https://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html
        let table = $("<table/>").addClass('TableGenerator');
        $.each(data, function(rowIndex, r) {
            let row = $("<tr/>").addClass('GeneratorRow');
            $.each(r, function(colIndex, c) {
                row.append($("<td/>").addClass('GeneratorCol').text(c));
            });
            table.append(row);
        });
        $('#flowerTable').html(table);
        $('#mainFlower').show();
        $('#returnButton').hide();
      }
    });
  });

  $('#chooseFlower').click(() => {
    const requestURL = 'flowerSightings/' + $('#flowerBox').val();
    console.log('making ajax request to: ', requestURL);
    $.ajax({
      url: requestURL,
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        $('#status').html('Flower chosen');
        //https://www.htmlgoodies.com/beyond/css/working_w_tables_using_jquery.html
        var table = $("<table/>").addClass('TableGenerator');
        $.each(data, function(rowIndex, r) {
            let row = $("<tr/>").addClass('GeneratorRow');
            $.each(r, function(colIndex, c) {
                row.append($("<td/>").addClass('GeneratorCol').text(c));
            });
            table.append(row);
        });
        $('#flowerTable').html(table);
        $('#mainFlower').hide();
        $('#returnButton').show();

      }
    });
  });

  $('#InsertNewSighting').click(() => {
    $.ajax({
      url: 'sightings',
      type: 'POST',
      dataType: 'json',
      data: {
        Name: $('#Sname').val(),
        Person: $('#SPerson').val(),
        Location: $('#SLocation').val(),
        Sighted: $('#SSighted').val()
      },
      success: (data) => {
        $('#status').html(data.message);
      }
    });
  });

  $('#UpdateFlower').click(() => {
    $.ajax({
      url: 'updateF',
      type: 'POST',
      dataType: 'json',
      data: {
        Comname: $('#FComname').val(),
        Genus: $('#FGenus').val(),
        Species: $('#FSpecies').val()
      },
      success: (data) => {
        $('#status').html(data.message);
      }
    });
  });

  $(document).ajaxError(() => {
    $('#status').html('Error: unknown ajaxError!');
  });

});
