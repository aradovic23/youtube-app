var api_key = '&key=AIzaSyBzwycJ440-ALIEdf_zwyyeze9Q-6N1o5g';
var yt_api = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q='

var input = document.querySelector('input');
var main = document.querySelector('.row');
var container = document.querySelector('.container ')
var body = document.querySelector('body')


function getData(id) {

    main.innerHTML = ""
    var request = new XMLHttpRequest();
    const search_value = input.value
    input.value = ''
    var link1 = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${search_value}${api_key}`
    var link2 = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&relatedToVideoId=${id}${api_key}`
    request.open('GET', id ? link2 : link1)
    request.onload = function () {
        var data = JSON.parse(request.responseText).items;
        generateElements(data);
        console.log(data);
    }
    request.send()

}


input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        getData()
    }
})



function generateElements(data) {
    data.forEach(e => {
        const videoCard = document.createElement('div')
        videoCard.setAttribute('class', 'col-4 thumb')
        var thumbnail = document.createElement('img')
        thumbnail.setAttribute('src', `${e.snippet.thumbnails.medium.url}`)
        const video_title = document.createElement('h2')
        video_title.textContent = `${e.snippet.title}`
        const description = document.createElement('p')
        description.textContent = `${e.snippet.description}`

        videoCard.addEventListener('click', function () {
            container.innerHTML = ''
            getData(e.id.videoId)
            console.log(e.id.videoId);
            const embedSection = document.createElement('div')
            embedSection.setAttribute('class', 'embedded')
            const videoEmbed = document.createElement('iframe');
            videoEmbed.setAttribute('src', `https://www.youtube.com/embed/${e.id.videoId}`)
            console.log(videoEmbed.src);
            videoEmbed.setAttribute('width', '100%')
            videoEmbed.setAttribute('height', '600px')
            container.appendChild(embedSection)
            embedSection.appendChild(videoEmbed)
        })

        main.appendChild(videoCard)
        videoCard.appendChild(thumbnail)
        videoCard.appendChild(video_title)
        videoCard.appendChild(description)
    })



}