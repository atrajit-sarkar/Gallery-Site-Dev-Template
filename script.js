const username = 'gongobongofounder' // Enter your github server username
const reponame = 'TestFolderPreview' // Enter your github server repo name
const repoURL = `https://api.github.com/repos/${username}/${reponame}/contents/`; // Replace with your GitHub repo details


async function fetchdirs() {
    try {
        const response = await fetch(repoURL);
        const data = await response.json();
        data.forEach(datam => {
            if (datam.type==='dir') {
                // console.log(datam.name);
                fetchMedia(datam.name,datam.name)

            }
        })


    } catch (error) {
        console.error('Error fetching media:', error);
    }
}
fetchdirs()


async function fetchMedia(path,dir_name) {
    try {
        const response = await fetch(repoURL+path);
        const data = await response.json();

        const videoGalleryContent = document.querySelector(".video-gallery .contents");
        const imageGalleryContent = document.querySelector(".image-gallery .contents");
        const videoGalleryContentFiles=document.createElement("div")
        const imageGalleryContentFiles=document.createElement("div")
        videoGalleryContentFiles.setAttribute("class","files")
        imageGalleryContentFiles.setAttribute("class","files")

        const vid_dirName=document.createElement("h2")
        const img_dirName=document.createElement("h2")

        vid_dirName.innerHTML=`${dir_name}`
        img_dirName.innerHTML=`${dir_name}`

        videoGalleryContent.appendChild(vid_dirName)
        imageGalleryContent.appendChild(img_dirName)
        
        videoGalleryContent.appendChild(videoGalleryContentFiles)
        imageGalleryContent.appendChild(imageGalleryContentFiles)




        data.forEach(file => {
            if (file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.heic')) {
                // Create and append an image element
                const imagecard = document.createElement("div");
                imagecard.setAttribute("class", "image-card");
                imageGalleryContentFiles.appendChild(imagecard);

                const img = document.createElement('img');
                const a = document.createElement('a');
                a.href = file.download_url;
                img.src = file.download_url;
                img.alt = file.name;
                imagecard.appendChild(a);
                a.appendChild(img);
            } else if (file.name.endsWith('.mp4')) {
                // Create and append a video element
                const videocard = document.createElement("div");
                videocard.setAttribute("class", "video-card");
                videoGalleryContentFiles.appendChild(videocard);

                const video = document.createElement('video');
                video.setAttribute("class", "video-player");
                video.controls = true;
                video.src = file.download_url;
                videocard.appendChild(video);


            }
        });

        // Get all video elements on the page
        const videos = document.querySelectorAll('.video-player');

        // Iterate over each video element
        videos.forEach(video => {
            video.addEventListener('play', () => {
                // Pause all other videos when one is played
                videos.forEach(v => {
                    if (v !== video) {
                        v.pause();
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error fetching media:', error);
    }
}

// fetchMedia();
