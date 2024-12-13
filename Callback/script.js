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

//Callback Function for fetching data 
async function getData(CallBack)
{
  //it will fetch the data if passed 
    try{
        const res=await fetch("https://dummyjson.com/posts");
        const result=await res.json();
        //call the render function
        //as callback function 
        CallBack(result.posts);
    }
    catch(err)
    {
      //error function will be shown if any kind of error occurs
        handleError(err.message);
    }
}


//Fetching:The Posts from the api
//creating async function to handle the fetch post request;
function fetchPost(CallBack,CallBack1) {

  //this will initiate a setTimeout for 5 seconds
    setTimeout(()=>{
      //as the time will be finished
      //it will call the callback function and passing the callback2 as argument to complete 
      //callback:getData()
      //Callback1:RenderingPost()
        CallBack(CallBack1);
    },5000);
}

//Rendering:The Posts to the dom
function RenderingPost(data) {
 Para.remove();
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
    item.tags.map((tag) => {
      const tags = document.querySelector(`.tags${item.id}`);
      tags.innerHTML += `<span class="tag">#${tag}</span>`;
    });
  });
}

//Adding: Event Listener Click to handle fetch data call
Button.addEventListener("click", () => {

  //Removing all the post cards if  the button will be called again
  Post_Container.innerHTML="";
  //setting the text
  Para.innerHTML = "CallBack executed after 5 seconds ....";
  //apepending the text to the post container div
  Post_Container.appendChild(Para);
  //setting the display none to flex
  Post_Container.style.display = "flex";
  //calling the fetch post function and passing the function as the agrument for call back
  fetchPost(getData,RenderingPost);
});


