$(document).ready(() => {
    // Set display: none; for all tabs
    $('[data-tab-content] > [data-tab]').each((index, elem) => {
        $(elem).css('display', 'none')
    })

    $('[data-tab-menu] > [data-tab]').click(function() {
        const currentTab = $(this).attr("data-tab")

        displayTab(currentTab)
        changeCurrentlySelectedButton(currentTab)
    })
})

function displayTab(tabIndex) {
    $(`[data-tab-content] > [data-tab="${tabIndex}"]`).css('display', 'block')

    $(`[data-tab-content] > [data-tab!="${tabIndex}"]`).each((index, elem) => {
        $(elem).css('display', 'none')
    })
}

function changeCurrentlySelectedButton(tabIndex) {
    $(`[data-tab-menu] > [data-tab="${tabIndex}"]`).prop('disabled', true)

    $(`[data-tab-menu] > [data-tab!="${tabIndex}"]`).each((index, elem) => {
        $(elem).prop('disabled', false)
    })
}