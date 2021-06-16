import Swal from "sweetalert2";

export const updateProgress = () => {
    //select existent tasks
    const tasks = document.querySelectorAll("li.tarea");
    if(tasks.length > 0) {
        //select completed tasks
        const completedTasks = document.querySelectorAll("i.completo");
        //calculate progress
        const progressAmount = Math.round((completedTasks.length / tasks.length) * 100);
        //show progress
        const progressBar = document.querySelector("#porcentaje");
        progressBar.style.width = progressAmount + "%";
        if(progressAmount == 100) {
            Swal.fire({
                title: "You completed all the tasks!",
                icon: "success"
            });
        }
    }
}