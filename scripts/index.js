// create task record here
$(document).ready(function(e) {

    var inputs = {};

    $('#create_task_form').submit((e) => {

        e.preventDefault();

        var taskName = $('#task_name').val();
        var taskDesc = $('#task_desc').val();

        inputs.name = taskName;
        inputs.desc = taskDesc;

        fetch('http://127.0.0.1:8000/api/v1/task', {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(() => window.location.reload());
    })
})


// function to fetch all data from the api
function loadTasks() {

    fetch("http://127.0.0.1:8000/api/v1/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(res => {
        const { data } = res;
        const elementContainerId = "#view_task_tbody";

        const taskElements = data.length > 0 && data.map((task, index) => {

            index++

            $(document).ready(function(e) {

                // update the task method
                $(`#save_task_btn_${task.id}`).click((e) => {

                    e.preventDefault();

                    const inputs = {};
                    
                    const { task_id } = e.target.attributes;
                    var taskId = parseInt(task_id.value);

                    var taskName = $(`#task_name_${task.id}`).val();
                    var taskDesc = $(`#task_desc_${task.id}`).val();

                    inputs.name = taskName;
                    inputs.desc = taskDesc;

                    
                    fetch(`http://127.0.0.1:8000/api/v1/task/${taskId}`, {
                        method: "PUT",
                        body: JSON.stringify(inputs),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(resp => resp.json())
                    .then(() => window.location.reload());
                });


                // delete the task method
                $(`#action_delete_btn_${task.id}`).click((e) => {

                    e.preventDefault();

                    const { task_id } = e.target.attributes;
                    var taskId = parseInt(task_id.value);

                    
                    fetch(`http://127.0.0.1:8000/api/v1/task/${taskId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(resp => resp.json())
                    .then(() => window.location.reload());
                });

            })
            
            return data.length > 0 ? (
                `<tr class="view-task-tr-body">
                    
                    <th class="view-task-td" scope="row">${index}</th>
                    <td class="view-task-td">${task.name}</td>
                    <td class="view-task-td">${task.desc}</td>
                    <td class="view-task-td">
                        <div class="modal fade" id="exampleModalCenter${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="edit-modal-content modal-content">
                                    <div class="edit-modal-header modal-header">
                                        <h5 class="edit-modal-title modal-title" id="exampleModalLongTitle">Edit task</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="edit-modal-body modal-body">
                                        <div class="edit-form-cover-flex">
                                            <div class="edit-form-cover-item">
                                                <form class="view-task-form" id="view_task_form_${task.id}" action="" method="post">
                                                    <div class="edit-input-cover-flex">
                                                        <div class="edit-input-cover-item">
                                                            <div class="input-cover-flex">
                                                                <div class="input-cover-item">
                                                                    <label class="edit-label" for="task_name_${task.id}">Name:</label><br />
                                                                    <input class="task-input" id="task_name_${task.id}" type="text" name="taskName" value="${task.name}" />
                                                                </div>
                                                                <div class="input-cover-item">
                                                                    <label class="edit-label" for="task_desc_${task.id}">Desc:</label><br />
                                                                    <input class="task-input" id="task_desc_${task.id}" type="text" name="taskDesc" value="${task.desc}" />
                                                                </div>
                                                            </div>
                                                            <div class="modal-btn-cover-flex">
                                                                <div class="modal-btn-cover-item">
                                                                    <button class="save-btn btn btn-primary" id="save_task_btn_${task.id}" task_id="${task.id}">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="action-cover">
                            <div class="action-cover-flex row">
                                <div class="action-cover-item col" id="action_cover_edit_item_${task.id}"><button class="action-btn btn btn-primary" id="action_edit_btn_${task.id}" type="button" data-toggle="modal" data-target="#exampleModalCenter${index}">Edit <i class="fa fa-edit"></i></button></div>
                                <div class="action-cover-itemn col"><button class="action-btn btn btn-danger" id="action_delete_btn_${task.id}" type="button" task_id="${task.id}">Delete <i class="fa fa-trash"></i></button></div>
                            </div>
                        </div>
                    </td>
                </tr>`
            ):
            (
                `<tr class="view-task-tr-body">
                    <td class="view-task-td" colspan="4">No record</td>
                </tr>`
            )
        })

        $(elementContainerId).html(taskElements);
    })
}

loadTasks();