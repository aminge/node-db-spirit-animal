$(document).ready(function() {

    loadData();

    $('#post-name-data').on('click', clickPostNameData);
    $('#name-container').on('click', '.post-animal-data', clickPostAnimalData);
});

function clickPostNameData() {
    event.preventDefault();
    var values = {};
    $.each($('#post-name-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $('#post-name-form').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/name',
        data: values,
        success: function(data) {
            console.log('From Server: ', data);
            console.log(data);
            personToDOM(data, '#name-container');
        }
    });
}

function clickPostAnimalData() {
    event.preventDefault();
    var values = {};
    $.each($('#post-animal-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    values.id = $(this).data('id');

    //$(this).find('input[type=text]').val('');

    //console.log(values);

    $.ajax({
        type: 'POST',
        url: '/animals',
        data: values,

        success: function(data) {
            console.log('From Server: ', data);
            console.log(data);
            //arrayToDOM(data, '#animal-container');
        }
    });

    $(this).parent().parent().remove();
}


function personToDOM(person, id){
    var output = '<div>';

    output += '<p>' + person.first_name + ' ' + person.last_name + '</p>';
    output += '<form id="post-animal-form"><label for="' + person.first_name + '-animal">' + person.first_name + '\'s Spirit Animal: </label>';
    output += '<input type="text" id="' + person.first_name + '-animal" name="animal_name" />';
    output += '<label for="' + person.first_name + '-color">' + person.first_name + '\'s Spirit Animal\'s Color: </label>';
    output += '<input type="text" id="' + person.first_name + '-color" name="animal_color" />';
    output += '<button class="post-animal-data" data-id="' + person.id + '">Submit</button></form>';

    output += '</div>'

    $(id).append(output);
}

function loadData(){
    $.ajax({
        type: 'GET',
        url: '/name',
        success: function(data){
            //arrayToDOM(data, '#name-container')
        }
    });

    $.ajax({
        type: 'GET',
        url: '/animals',
        success: function(data){
            //arrayToDOM(data, '#animal-container')
        }
    });
}