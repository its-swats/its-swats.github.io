$(function(){
  projects(); 
  addContent();
})


var projects = function(){
  $('#projects').on('click', function(event){
    event.preventDefault();
    $('.projectDetailsWindow').animate({'height': '0em'}, 1000, function(){
      $('#projectDeets').html('')
      $('.projectBar').animate({'height': '7.5em'})
      openProjectsTab();
    })
  })
}

var addContent = function(){
  $('#emptySpace').delegate('.icon', 'click', function(event){
    var target = $(this).parent().attr('id');
    $('.projectBar').animate({'height': '0em'}, 1000, function(){
      $('#emptySpace').html('')
      $('.projectDetailsWindow').animate({'height': '17.5em'})
      projectDetails(target)
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

var projectData = [
                    {label: 'hsCardLookup', image: 'hearthstone', description: 'Hearthstone Card Lookup is a personal project designed to consume an API consisting of JSON objects. It will return cards from Blizzard\'s game Hearthstone based on the user\'s search parameters.', technologies: 'rails-api, Javascript, jQuery, Handlebars'},
                    {label: 'TasteMaker', image: 'tastemaker', description: 'TasteMaker was a Final Project at Dev Bootcamp. It is an iOS App written in JavaScript that allows users to scan and catalog the wines that they drink. Users can answer questions about their scanned wines, building up a taste profile, that will be used to recommend other wines that the user may like.', technologies: 'Meteor, Javascript, jQuery, FoundationCSS, UnderscoreJS'},
                    {label: 'timeTrackr', image: 'timetrackr', cssOptions: 'iconify', description: 'timeTrackr is a Chrome Extension developed in JavaScript that tracks a user\'s time spent on each domain. The extension will then display that information to the user so that they can track their browsing habits', technologies: 'Javascript, jQuery, Highcharts, Chrome Extension' }
                  ]








