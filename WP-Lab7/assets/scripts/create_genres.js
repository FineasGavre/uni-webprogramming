$(document).ready(() => {
    $('#error_alert').css('display', 'none')

    $('#cancel_button').click(() => {
        window.location = '/genres/index.php'
    })

    $('#save_button').click(function() {
        if ($('#genre_name').val().length === 0) {
            $('#error_alert').css('display', 'block')
            return
        }

        $('#error_alert').css('display', 'none')
        console.log("Attempting to save")
        $.ajax({
            type: 'POST',
            url: window.location,
            data: {
                'genre_name': $('#genre_name').val()
            },
            success: function (data) {
                if (data['result']) {
                    window.location = '/genres/index.php'
                } else {
                    $('#error_alert').css('display', 'block')
                }
            }
        })
    })
})