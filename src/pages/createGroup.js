import '../index.css';

function myFunction(){
    alert("Group is Created");
}
function createGroup(){
  
    return(
        <div className = "groupCreation">
            <main>
                <div className='createGroup-main-container'>
                    <input type="text" id="gname" name="groupName"> </input><br></br>
                    <button onclick = "myFunction()"> Create </button>
                </div>
            </main>

        </div>   
    )
}

export default createGroup;
