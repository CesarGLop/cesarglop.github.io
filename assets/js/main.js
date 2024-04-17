(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});
// DESDE AQUI PUSE ******************************************
function resetDesc (){
    $('.skill-detail-box-desc').html('');
  }
  $(".skill-btn-excel").click(
    function () {
      //AlertSave();
      resetOpacity();
      excelNeedle();
      resetDesc();
      excelDesc();
      $('.skill-meter-label-7').css('opacity', '1');						//EXCEL
    }
  );
  $(".skill-btn-html").click(
    function () {
		resetOpacity();
		htmlNeedle();
		resetDesc();
		htmlDesc();
		$('.skill-meter-label-5').css('opacity', '1');						//SQL
    }
	);
    $(".skill-btn-css").click(
    function () {
    	resetOpacity();
		cssNeedle();
		resetDesc();
		cssDesc();
		$('.skill-meter-label-4').css('opacity', '1');						//PYTHON
    }
	);
	$(".skill-btn-js").click(
    function () {
		resetOpacity();
		jsNeedle();
		resetDesc ();
		jsDesc ();
		$('.skill-meter-label-2').css('opacity', '1');						//R
    }
  );
  $(".skill-btn-sql").click(
    function () {
      resetOpacity();
      sqlNeedle();
      resetDesc ();
      sqlDesc ();
      $('.skill-meter-label-5').css('opacity', '1');						//TABLEAU
    }
  );
  $(".skill-btn-python").click(
    function () {
      resetOpacity();
      pythonNeedle();
      resetDesc ();
      pythonDesc ();
      $('.skill-meter-label-6').css('opacity', '1');						//POWERBI
    }
  );
  $(".skill-btn-joke1").click(
    function () {
      resetOpacity();
      j1Needle();
      resetDesc ();
      j1Desc ();
      $('.skill-meter-label-1').css('opacity', '1');						//JOKE
    }
  );




function resetOpacity() {
  $('.skill-meter-label').css('opacity','0.6');
}

///////////////////////NEEDLE ROTATE///////////////////////////
function hideNeedle(){
  $(".skill-meter-needle").hide();
}

function excelNeedle(){					//ESTA ES LA QUE CONTROLA EXCEL
  $(".skill-meter-needle").animate({  borderSpacing: 170 }, {
    step: function(now,fx) {
      $(this).css('-webkit-transform','rotate('+now+'deg)');
      $(this).css('-moz-transform','rotate('+now+'deg)');
      $(this).css('transform','rotate('+now+'deg)');
    },
    duration:'slow'
  },'linear');}
  function htmlNeedle(){				//ESTA ES LA QUE CONTROLA SQL
    $(".skill-meter-needle").animate({  borderSpacing: 120 }, {
      step: function(now,fx) {
        $(this).css('-webkit-transform','rotate('+now+'deg)');
        $(this).css('-moz-transform','rotate('+now+'deg)');
        $(this).css('transform','rotate('+now+'deg)');
      },
      duration:'slow'
    },'linear');}
    function cssNeedle(){				//ESTA ES LA QUE CONTROLA PYTHON
      $(".skill-meter-needle").animate({  borderSpacing: 90 }, {
        step: function(now,fx) {
          $(this).css('-webkit-transform','rotate('+now+'deg)');
          $(this).css('-moz-transform','rotate('+now+'deg)');
          $(this).css('transform','rotate('+now+'deg)');
        },
        duration:'slow'
      },'linear');}
      function jsNeedle(){				//ESTA ES LA QUE CONTROLA R
        $(".skill-meter-needle").animate({  borderSpacing: 50 }, {
          step: function(now,fx) {
            $(this).css('-webkit-transform','rotate('+now+'deg)');
            $(this).css('-moz-transform','rotate('+now+'deg)');
            $(this).css('transform','rotate('+now+'deg)');
          },
          duration:'slow'
        },'linear');}
        function pythonNeedle(){		//ESTA ES LA QUE CONTROLA POWER BI
          $(".skill-meter-needle").animate({  borderSpacing: 145 }, {
            step: function(now,fx) {
              $(this).css('-webkit-transform','rotate('+now+'deg)');
              $(this).css('-moz-transform','rotate('+now+'deg)');
              $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'slow'
          },'linear');}
          function sqlNeedle(){			//ESTA ES LA QUE CONTROLA TABLEAU
            $(".skill-meter-needle").animate({  borderSpacing: 120 }, {
              step: function(now,fx) {
                $(this).css('-webkit-transform','rotate('+now+'deg)');
                $(this).css('-moz-transform','rotate('+now+'deg)');
                $(this).css('transform','rotate('+now+'deg)');
              },
              duration:'slow'
            },'linear');}
            function j1Needle(){		//ESTA ES LA QUE CONTROLA SINGING JAJA
              $(".skill-meter-needle").animate({  borderSpacing: 10 }, {
                step: function(now,fx) {
                  $(this).css('-webkit-transform','rotate('+now+'deg)');
                  $(this).css('-moz-transform','rotate('+now+'deg)');
                  $(this).css('transform','rotate('+now+'deg)');
                },
                duration:'slow'
              },'linear');}

              //////////////////////DESCRIPTION BOX///////////////////////

              function excelDesc (){			//EXCEL
                $('<span>Macros, VBA, advanced logical formulas, vlookup</span>').appendTo('.skill-detail-box-desc').hide().fadeIn();
              }
              function htmlDesc (){				//SQL
                $('<span>Window Functions, CTEs, Subqueries, Advanced Joins</span>').appendTo('.skill-detail-box-desc').hide().fadeIn();
              }
              function cssDesc (){				//PYHTON
                $('<span>Data Structures, Numpy, Pandas, Matplotlib, Seaborn</span>').appendTo('.skill-detail-box-desc').hide().fadeIn();
              }
              function jsDesc (){				//R
                $('<span>dplyr, ggplot2</span>').appendTo('.skill-detail-box-desc').hide().fadeIn();
              }
              function pythonDesc (){			//POWER BI
                $('<span>Power Query, Modeling, Relationships, DAX</span>').appendTo('.skill-detail-box-desc').hide().fadeIn();
              }
              function sqlDesc (){				//TABLEAU
                $('<span>Tableau Prep, Modeling, Calc Fields, Table Calculations </span>').appendTo('.skill-detail-box-desc').hide().fadeIn();
              }
              function j1Desc (){				//SINGING
                $('<span>No karaoke please</span>').appendTo('.skill-detail-box-desc').hide().fadeIn();
              }

})(jQuery);