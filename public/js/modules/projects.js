import Swal from "sweetalert2";
import axios from "axios";
let btnDelete;
try {
    btnDelete = document.querySelector("#eliminar-proyecto");
    btnDelete.addEventListener("click", (event) => {
        //console.log(event.target.dataset);
        const url = event.target.dataset.projectUrl;
        Swal.fire({
            title: 'Are you sure you want to delete this project?',
            text: "You won't be able to recover it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                //send request to axios
                //const reqUrl = `${location.origin}/projects/${url}`;
                const reqUrl = url;
                axios.delete(url, {
                    params: {reqUrl}
                }).then((response) => {
                    //console.log(response);
                    Swal.fire(
                        'Project deleted!',
                        'Your project has been deleted.',
                        'success'
                    );
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 2500);
                }).catch((reject) => {
                    Swal.fire({
                        type: "error",
                        title: "Something went wrong",
                        text: "The project couldn't be deleted."
                    });
                });
            }
        })
    });
} catch(err) {
    console.log("[ERROR] A button wasn't found in the view: " + err);
}