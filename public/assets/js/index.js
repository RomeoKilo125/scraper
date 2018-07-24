$(document).ready(() => {

  $(`#btnViewSaved`).on(`click`, event => {
    event.preventDefault()
    location.href= `/saved`
  })

  $(`#btnViewAll`).on(`click`, event => {
    event.preventDefault()
    location.href = `/`
  })

  $(`#btnScrape`).on('click', event => {
    event.preventDefault()
    $.ajax({
      method: `GET`,
      url: '/scrape'
    })
  })

  $(`.btnSave`).on(`click`, function(event) {
    event.preventDefault()
    $.ajax({
      method: `PUT`,
      url: `/article/save/${$(this).data('id')}`
    }).then(data => {
      location.reload()
    }).catch(err => console.log(err))
  })

  $(`.btnUnSave`).on(`click`, function(event) {
    event.preventDefault()
    $.ajax({
      method: `PUT`,
      url: `/article/unsave/${$(this).data('id')}`
    }).then(data => {
      location.reload()
    }).catch(err => console.log(err))
  })

  $(`.btnComment`).on(`click`, function(event) {
    event.preventDefault()
    let articleID = $(this).data(`id`)
    let modal = $(`#${articleID}-comments`)
    modal.css(`display`, `block`)
  })

  $(`.close`).on(`click`, () => {
    $(`.modal`).css(`display`, `none`)
  })

  $(window).on(`click`, function(event) {
    if (event.target.className == `modal`) {
      $(`.modal`).css(`display`, `none`)
    }
  })

})
