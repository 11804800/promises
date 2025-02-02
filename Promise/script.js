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
  Para.innerHTML = err;
}

//Fetching:The Posts from the api
//creating async function to handle the fetch post request;
async function fetchPost() {
  //creating a controller to cancel the get api request
  const controller = new AbortController();
  //fetching the signal from the controller
  const signal = controller.signal;

  //creating a timeout frunction of 5 seconds to call the controller
  const Timeout = setTimeout(() => {
    //cancelling the request
    controller.abort();
  }, 5000);

  //fetchig the data and passing the signal
  return fetch("https://dummyjson.com/posts", { signal: signal })
    .then((response) => {
      //if api will return response then it will clear the timeout else continue and cancel the request after 5 seconds of api call
      clearTimeout(Timeout);
      if(response.ok)
      {
        return response.json();
      }
      else
      {
        throw new Error(response.statusText);
      }
    })
    .then((result) => {
      //removig loading text
      Para.remove();
      //calling the render post function
      RenderingPost(result.posts);
    })
    .catch((err) => {
      //if the request has been aborted
      if (err.name === "AbortError") {
        //then the text operation timed out will appear
        handleError("Operation Timed out");
      } else {
        //else the error message will appear
        handleError(err.message);
      }
    });
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
                <p><i class="fa-solid fa-heart" style="color:red"></i> ${item.reactions.likes}</p>
                <p><i class="fas fa-thumbs-down"></i> ${item.reactions.dislikes}</p>
                <p><i class="fa-solid fa-eye"></i> ${item.views}</p>
             </div>
          </div>`;
    Post_Container.innerHTML += html;
    //rending the tags to the post cards
    item.tags.map((tag) => {
      const tags = document.querySelector(`.tags${item.id}`);
      tags.innerHTML += `<span class="tag">#${tag}</span>`;
    });
  });
}

//Adding: Event Listener Click to handle fetch data call
Button.addEventListener("click", () => {
  //removing the content of post container div
  Post_Container.innerHTML = "";
  //setting the text
  Para.innerHTML = "Loading...";
  //appending it to the dom
  Post_Container.appendChild(Para);
  Post_Container.style.display = "flex";
  //calling the fetch post btn
  fetchPost();
});
