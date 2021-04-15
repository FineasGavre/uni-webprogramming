const errorAlert = $('#error_alert')
const titleInput = $('#title')
const formatInput = $('#format')
const filePathInput = $('#file_path')
const genreInput = $('#genre')

$(document).ready(() => {
    const isValueNull = (elem) => elem.val().length === 0

    const urlParams = new URLSearchParams(window.location.search)
    if (!urlParams.has('id')) {
        window.location = '/files/create.php'
    }

    const id = urlParams.get('id')

    $.ajax({
        type: 'POST',
        url: '/genres/index.php',
        success: function (data) {
            data['data'].forEach((elem) => {
                genreInput.append(`
                    <option value="${elem.id}">${elem.genre}</option>
                `)
            })

            loadExistingData(id)
        }
    })

    errorAlert.css('display', 'none')

    $('#cancel_button').click(() => {
        window.location = '/files/index.php'
    })

    $('#save_button').click(function() {
        if (isValueNull(titleInput) || isValueNull(formatInput) || isValueNull(filePathInput) || isValueNull(genreInput)) {
            errorAlert.css('display', 'block')
            return
        }

        errorAlert.css('display', 'none')
        console.log("Attempting to save")
        $.ajax({
            type: 'POST',
            url: window.location,
            data: {
                'id': id,
                'genre': genreInput.val(),
                'title': titleInput.val(),
                'format': formatInput.val(),
                'file_path': filePathInput.val()
            },
            success: function (data) {
                if (data['result']) {
                    window.location = '/files/index.php'
                } else {
                    $('#error_alert').css('display', 'block')
                }
            }
        })
    })
})

function loadExistingData(id) {
    $.ajax({
        type: 'POST',
        url: '/files/index.php',
        data: {
            id
        },
        success: function (data) {
            const item = data['data'][0]
            genreInput.val(item['genre_id'])
            titleInput.val(item['title'])
            formatInput.val(item['format'])
            filePathInput.val(item['file_path'])
        }
    })
}