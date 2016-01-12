$(function(){
  projects(); 
  addContent();
})

// if not active, load immediately and make active
// if active, close it down, and remove active
var projects = function(){
  $('#projects').on('click', function(event){
    event.preventDefault();
    if ($(this).hasClass('active') == false) {
      $(this).toggleClass('active')  
      $('.projectBar').animate({'height': '7.5em'})
      openProjectsTab();
    } else {
      $(this).toggleClass('active')  
      $('.projectDetailsWindow').animate({'height': '0em'}, 1000, function(){
        $('#projectDeets').html('')
      })
      $('.projectBar').animate({'height': '0em'}, 1000, function(){
        $('#emptySpace').html('')
      })
    }  
  })
}

var addContent = function(){
  $('#emptySpace').delegate('.icon', 'click', function(event){
    var target = $(this).parent().attr('id');
    $('.projectBar').animate({'height': '0em'}, 1000, function(){
      $('#emptySpace').html('')
      projectDetails(target)
      autoSizeHeight('.projectDetailsWindow')
    });
  })
}

var openProjectsTab = function(){
  var template = $('#projectIcons').html();
  var template = Handlebars.compile(template);
  var context = {'project': projectData};
  var template = template(context);
  $('#emptySpace').html(template);
}

var projectDetails = function(target){
  var object = projectData.filter(function( obj ) {
    return obj.label == target;
  });
  var template = $('#projectDetails').html();
  var template = Handlebars.compile(template);
  var context = {'project': object[0]};
  var template = template(context);
  $('#projectDeets').html(template); 
}

var autoSizeHeight = function(target) {
  var curHeight = $(target).height();
  $(target).css('height', 'auto');
  var autoHeight = $(target).height();
  $(target).height(curHeight).animate({height: autoHeight}, 1000);
}

var projectData = [
                    { label: 'hsCardLookup', 
                      image: 'hearthstone', 
                      description: 'Hearthstone Card Lookup is a personal project designed to consume an API consisting of JSON objects. It will return cards from Blizzard\'s game Hearthstone based on the user\'s search parameters.', 
                      technologies: 'rails-api, Javascript, jQuery, Handlebars',
                      github: 'https://github.com/its-swats/HearthstoneCardSearch',
                      deployed: 'http://hearthstone-card-lookup.herokuapp.com/'
                    },

                    { label: 'TasteMaker', 
                      image: 'tastemaker', 
                      description: 'TasteMaker was a Final Project at Dev Bootcamp. It is an iOS App written in JavaScript that allows users to scan and catalog the wines that they drink. Users can answer questions about their scanned wines, building up a taste profile, that will be used to recommend other wines that the user may like.', 
                      technologies: 'Meteor, Javascript, jQuery, FoundationCSS, UnderscoreJS',
                      github: 'https://github.com/its-swats/TasteMaker'
                    },

                    { label: 'timeTrackr', 
                      image: 'timetrackr', 
                      cssOptions: 'iconify', 
                      description: 'timeTrackr is a Chrome Extension developed in JavaScript that tracks a user\'s time spent on each domain. The extension will then display that information to the user so that they can track their browsing habits', 
                      technologies: 'Javascript, jQuery, Highcharts, Chrome Extension',
                      github: 'https://github.com/its-swats/timeTrackr',
                      deployed: 'https://chrome.google.com/webstore/detail/timetrackr/nggcadhllpclemfkfodacomdhbkbahjd'
                    }
                  ]








