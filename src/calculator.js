$(document).ready(function () {

  var num1;
  var num2;
  var operator;
  var operatorText;
  var total;

  // Used for multiple numbers to be inputted on the display & written to one of the num variables. Each time a numeric button is pushed its added into the array, the array is then joined & outputted to the display.
  var displayNumbers = [];
  var tape = [];

  $('#keys button.number, #decimal').on('click', function() {

    var getPressedNumber = $(this).text();
    displayNumbers.push(getPressedNumber);

    $('#display span').text(displayNumbers.join(''));

  });

  $('#keys button.operator').on('click', function() {

    // Store the number currently in the display and parse the string to a number.
    num1 = $('#display span').text();
    num1 = parseFloat(num1);

    // Clear the display
    displayNumbers = [];

    operator = $(this).text();

    // Display operator symbol as text on the display
    switch(operator) {
      case "+":
        operatorText = 'Plus';
        break;

      case "-":
        operatorText = 'Minus';
        break;

      case "*":
        operatorText = 'Times';
        break;

      case "/":
        operatorText = 'Divide';
        break;
    }

    $('#display span').text(operatorText);

  });

  // Equals
  $('button#equals').on('click', function() {

    if(num1 === 0 && num2 === 0) {
      $('#display span').text('0');
    }

    num2 = $('#display span').text();
    num2 = parseFloat(num2);

    switch(operator) {
      case "+":
        total = add(num1, num2);
        break;

      case "-":
        total = subtract(num1, num2);
        break;

      case "*":
        total = multiply(num1, num2);
        break;

      case "/":
        total = divide(num1, num2);
        break;

    }

    $('#display span').text(total);

    var equals = '=';

    // Create a tape entry
    tape.push(num1 + operator + num2 + equals + total);
    tapeDisplay();

  });

  // Clear all
  $('#clear').on('click', function() {

    num1 = null;
    num2 = null;
    operator = null;
    total = null;
    displayNumbers = [];

    $('#display span').text('0');

  });

  // Main logic for calculations
  function add(n1, n2) {
    return n1 + n2;
  }

  function subtract(n1, n2) {
    return n1 - n2;
  }

  function multiply(n1, n2) {
    return n1 * n2;
  }

  function divide(n1, n2) {
    return n1 / n2;
  }

  // Tape display
  function tapeDisplay() {

    // Clear display
    $('#tape-list').empty('li');

    if(tape.length) {
      $('#tape-content span').text('Your calculations.');
    } else {
      $('#tape-content span').text('No calculations have been made.');
    }

    for(var i = 0; i < tape.length; i++) {

      $('#tape-list').append('<li>' + tape[i].toString(tape[i]) + '</li>');

    }
  }

  // Show/hide tape display
  $('#tape').on('click', function() {

    if($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }

    $('#tape-content').slideToggle();

  });

  // Clear tape
  $('#clear-tape').on('click',function() {

    $('#tape-list').empty('li');
    tape = [];

    // Run tapeDisplay to update calculations messaging.
    tapeDisplay();

  });

});
