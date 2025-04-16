const accessKey = '_mqG72CZqYI0DUR6QFyP7hUJlAfGb7Fo6igx2TPu7mQ';
const searchForm = document.querySelector('form');
const loadMorebtn = document.querySelector('.loadMorebtn');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const search = document.querySelector('.material-symbols-outlined')
 // function to fatch api using unsplace api 

    

 let page = 1;
 const fetchImages =async(query, pageNo) =>{
    try{
    if(pageNo === 1){
        imagesContainer.innerHTML = " ";
       

    }
    
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
 const response = await fetch(url);
 const data = await response.json();
//  console.log(data);
if(data.results.length > 0){
    
data.results.forEach(photo => {
    // creat imagediv
    const imageElement = document.createElement('div');
    imageElement.classList.add('imageDiv')
    imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
    // create overlay element 
    const overlayElement = document.createElement('div');
    overlayElement.classList.add('overlay');

    //create overlay text
    const overlayText = document.createElement('h3');
    overlayText.innerText =` ${photo.alt_description}`;
    overlayElement.appendChild(overlayText);
    imageElement.appendChild(overlayElement);
    imagesContainer.appendChild(imageElement);
   


    
});
if(data.total_pages === pageNo){
    loadMorebtn.style.display = "none";
}
else{
    loadMorebtn.style.display = "block";

}
 
    

 }
 else{
      imagesContainer.innerHTML = `<h2>No image found..</h2>`
      if(loadMorebtn.style.display === "block"){
        loadMorebtn.style.display === "none";


    }

 }

 }
 catch (error)
 {
      imagesContainer.innerHTML = `<h2> Failed to load images..</h2>`;

 }

}
 




// add event listener to searchform

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
   const inputtext = searchInput.value.trim();
   if(inputtext !== ''){
     page = 1;
   
    fetchImages(inputtext, page);
   }
   else{
    imagesContainer.innerHTML = `<h2> Please enter a search query..</h2>`;
    if(loadMorebtn.style.display === "block"){
        loadMorebtn.style.display === "none";


    }
   }

})

// add event listener to loadmore
loadMorebtn.addEventListener('click',()=>{
    fetchImages(searchInput.value.trim(),++page)

})
