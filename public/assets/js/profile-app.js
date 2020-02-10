

//Photo api 
var uploadPhoto = $("#upload")


$(document).on('click', "#upload", function (event) {
  event.preventDefault();
  console.log('listening to upload photolistening to upload photolistening to upload photo');
  const apikey = 'AnBtXR1PTouMhw0LPPcyAz';
  const client = filestack.init(apikey);
  const options = {
    maxFiles: 20,
    uploadInBackground: false,
    onOpen: () => console.log('opened!'),
    onUploadDone: (res) => console.log(res),
  };
  client.picker(options).open();
});




$(function () {
  // Remove Search if user Resets Form or hits Escape!
$('body, .navbar-collapse form[role="search"] button[type="reset"]').on('click keyup', function(event) {
console.log(event.currentTarget);
if (event.which == 27 && $('.navbar-collapse form[role="search"]').hasClass('active') ||
  $(event.currentTarget).attr('type') == 'reset') {
  closeSearch();
}
});

function closeSearch() {
      var $form = $('.navbar-collapse form[role="search"].active')
  $form.find('input').val('');
$form.removeClass('active');
}

// Show Search if form is not active // event.preventDefault() is important, this prevents the form from submitting
$(document).on('click', '.navbar-collapse form[role="search"]:not(.active) button[type="submit"]', function(event) {
event.preventDefault();
var $form = $(this).closest('form'),
  $input = $form.find('input');
$form.addClass('active');
$input.focus();

});
// ONLY FOR DEMO // Please use $('form').submit(function(event)) to track from submission
// if your form is ajax remember to call `closeSearch()` to close the search container
$(document).on('click', '.navbar-collapse form[role="search"].active button[type="submit"]', function(event) {
event.preventDefault();
var $form = $(this).closest('form'),
  $input = $form.find('input');
$('#showSearchTerm').text($input.val());
      closeSearch()
});
});

// ========================= PAYMENT PAGE JS ========================= //

$(function() {
  $('form.require-validation').bind('submit', function(e) {
    var $form         = $(e.target).closest('form'),
        inputSelector = ['input[type=email]', 'input[type=password]',
                         'input[type=text]', 'input[type=file]',
                         'textarea'].join(', '),
        $inputs       = $form.find('.required').find(inputSelector),
        $errorMessage = $form.find('div.error'),
        valid         = true;

    $errorMessage.addClass('hide');
    $('.has-error').removeClass('has-error');
    $inputs.each(function(i, el) {
      var $input = $(el);
      if ($input.val() === '') {
        $input.parent().addClass('has-error');
        $errorMessage.removeClass('hide');
        e.preventDefault(); // cancel on first error
      }
    });
  });
});

$(function() {
  var $form = $("#payment-form");

  $form.on('submit', function(e) {
    if (!$form.data('cc-on-file')) {
      e.preventDefault();
      Stripe.setPublishableKey($form.data('stripe-publishable-key'));
      Stripe.createToken({
        number: $('.card-number').val(),
        cvc: $('.card-cvc').val(),
        exp_month: $('.card-expiry-month').val(),
        exp_year: $('.card-expiry-year').val()
      }, stripeResponseHandler);
    }
  });

  function stripeResponseHandler(status, response) {
    if (response.error) {
      $('.error')
        .removeClass('hide')
        .find('.alert')
        .text(response.error.message);
    } else {
      // token contains id, last4, and card type
      var token = response['id'];
      // insert the token into the form so it gets submitted to the server
      $form.find('input[type=text]').empty();
      $form.append("<input type='hidden' name='reservation[stripe_token]' value='" + token + "'/>");
      $form.get(0).submit();
    }
  }
})