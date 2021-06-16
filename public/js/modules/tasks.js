import axios from "axios";
import Swal from "sweetalert2";
import {updateProgress} from "../functions/progress"
//backtick: `
const tasks = document.querySelector(".listado-pendientes");
if(tasks) {
    tasks.addEventListener("click", (event) => {
        //console.log(event.target.classList);
        if(event.target.classList.contains("fa-check-circle")) {
            //console.log("[INFO] Updating...");
            const icon = event.target;
            const idTask = icon.parentElement.parentElement.dataset.taskid;
            const reqUrl = `${location.origin}/tasks/${idTask}`;
            axios.patch(reqUrl, {
                idTask
            }).then((response) => {
                if(response.status == 201) {
                    icon.classList.toggle("completo");
                    updateProgress();
                }
            }).catch((reject) => {
                //fill with sweet alert
            })
        }
        if(event.target.classList.contains("fa-trash")) {
            const taskHTML = event.target.parentElement.parentElement;
            const idTask = taskHTML.dataset.taskid;
            //console.log(taskHTML);
            //console.log(idTask);
            Swal.fire({
                title: 'Are you sure you want to delete this task?',
                text: "You won't be able to recover it!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
            }).then((result) => {
                if(result.isConfirmed) {
                    //console.log("[INFO] Triggered a deletion");
                    const reqUrl = `${location.origin}/tasks/${idTask}`
                    axios.delete(reqUrl, {
                        idTask
                    }).then((response) => {
                        if(response.status == 200) {
                            taskHTML.parentElement.removeChild(taskHTML);
                        }
                        Swal.fire({
                            title: "Task removed successfully!",
                            icon: "success"
                        });
                    }).catch((reject) => {
                        Swal.fire({
                            title: "Failed to remove task!",
                            icon: "fail"
                        });
                    });
                }
            });
        }
    });
}
export default tasks;