$(function(){
  projects(); 
  addContent();
})


var projects = function(){
  $('#projects').on('click', function(event){
    event.preventDefault();
    $('.projectBar').animate({'height': '7.5em'})
    openProjectsTab();
  })
}

var addContent = function(){
  $('#emptySpace').delegate('.icon', 'click', function(event){
    
  })
}

var openProjectsTab = function(){
  var template = $('#projectDetails').html();
  var template = Handlebars.compile(template);
  var context = {'project': projectData};
  var template = template(context);
  $('#emptySpace').html(template);
}

var projectData = [
                    {label: 'hsCardLookup', image: 'hearthstone'},
                    {label: 'TasteMaker', image: 'tastemaker'},
                    {label: 'timeTrackr', image: 'timetrackr', cssOptions: 'iconify'}
                  ]








