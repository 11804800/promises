//start of the file

//Accessing: Button from the dom to call fetch function

const Button = document.getElementById("data-fetching-btn");

//Accesing the Post contaner
const Post_Container = document.getElementById("Posts-Container-div");

//Creating Gloabl varibale for p tag to update and remove
var Para = document.createElement("p");


//Creating: The function to handle error
//this update the p tag showing error message
function handleError(err) {
  //writting the error message to the post container p tag
  Para.innerHTML=err.message;
}


//Fetching:The Posts from the api
//creating async function to handle the fetch post request;
async function fetchPost() {
  //try catch block
  try
  {
  //fetching and storing the response
  const res = await fetch("https://dummyjson.com/posts");

  //converting it to json
  const result = await res.json();
  //removing the loading text
  Para.remove();
  //showing the posts on the page
  RenderingPost(result.posts);
  }
  catch(err)
  {
    //calling handle error function
    handleError(err);
  }
}

//Rendering:The Posts to the dom
function RenderingPost(data) {
  data.map((item) => {
    const html = `
        <div class="post-card" key=${item.id}>
           <h4>${item.title}</h4>
           <p>${item.body}<p>
           <div class="tags${item.id} tag-container"></div>
           <div class="post-reactions">
              <p><i class="fa-solid fa-heart" style="color:red"></i> ${
                item.reactions.likes
              }</p>
              <p><i class="fas fa-thumbs-down"></i> ${
                item.reactions.dislikes
              }</p>
              <p><i class="fa-solid fa-eye"></i> ${item.views}</p>
           </div>
        </div>`;
    Post_Container.innerHTML += html;
    //rendering the tags to the post cards
    item.tags.map((tag) => {
      //accessing by tagsid unique for all the post cards
      const tags = document.querySelector(`.tags${item.id}`);
      tags.innerHTML += `<span class="tag">#${tag}</span>`;
    });
  });
}

//Adding: Event Listener Click to handle fetch data call
Button.addEventListener("click", () => {
  //remove all the texts 
  Post_Container.innerHTML="";
  //setting loading
  Para.innerHTML = "Loading...";
  //appending to the post container div
  Post_Container.appendChild(Para);
  //changing the display from none to flex
  Post_Container.style.display = "flex";
  //calling the fetch data function
  fetchPost();
});
