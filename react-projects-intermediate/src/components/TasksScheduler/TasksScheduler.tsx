import { useState } from "react";
import { useForm } from "react-hook-form";

interface Task {
  id:number,
  label:string;
  priority:0|1;
  date:string;
}

const isCompleted = (first:Date) => {
  let today = new Date();
  let selected = new Date(first);

  today.setHours(0,0,0,0);
  selected.setHours(0,0,0,0);

  return selected < today;
}

let sorted = false;

const TasksScheduler = () => {
  const {register, handleSubmit, reset} = useForm();
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  if (pendingTasks.length > 0 && !sorted) {
    let tempTop = [...pendingTasks.filter( task => task.priority === 1 )];
    let tempLow = [...pendingTasks.filter( task => task.priority === 0 )];

    console.log(tempTop, tempLow);

    let tempTopSorted = [...tempTop];
    tempTopSorted.sort( (a,b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      aDate.setHours(0,0,0,0);
      bDate.setHours(0,0,0,0);

      return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
    } );
    let tempLowSorted = [...tempLow];
    tempLowSorted.sort( (a,b) => {
      let aDate = new Date(a.date);
      let bDate = new Date(b.date);
      aDate.setHours(0,0,0,0);
      bDate.setHours(0,0,0,0);

      return aDate < bDate ? -1 : aDate > bDate ? 1 : 0;
    } );

    setPendingTasks([...tempTopSorted, ...tempLowSorted]);
    sorted = true;
  }
  
  return (
    <div className="w-250 mx-auto shadow-2xl rounded-xl mt-10 p-5 flex flex-col items-center">
      <h1 className="text-5xl font-bold font-serif text-blue-400 uppercase">Tasks Scheduler</h1>
      <form onSubmit={handleSubmit( (data) => {
        sorted = false;
        if (isCompleted(data.task_date))
          setCompletedTasks([...completedTasks, {id:completedTasks.length+1,label:data.task_name, priority:data.task_priority, date:data.task_date}]);
        else
          setPendingTasks([...pendingTasks, {id:pendingTasks.length+1,label:data.task_name, priority:data.task_priority, date:data.task_date}]);
        reset();
      } )} >
      <div className="flex gap-3 mt-5 justify-evenly">
          <input {...register('task_name', {required:true})} className="border rounded-xl p-2 px-4 text-xl" type="text" name="task_name" id="input-name" placeholder="Enter task..." />
          <select {...register('task_priority', {valueAsNumber:true})} className="cursor-pointer border rounded-xl p-2 px-4 text-xl" name="task_priority" id="select-priority" >
            <option value={1}>Top Priority</option>
            <option value={0}>Low Priority</option>
          </select>
          <input {...register('task_date', {required:true})} className="border rounded-xl p-2 px-4 text-xl cursor-pointer" type="date" name="task_date" id="input-date" />
          <button className="bg-green-600 cursor-pointer text-white border rounded-xl p-2 px-4 text-xl" type="submit">Add Task</button>
      </div>
      </form>

      <h2 className="text-3xl place-self-start m-5">Upcoming Tasks</h2>
      <div className="border py-5 grid grid-cols-4 bg-gray-200 rounded-xl w-full justify-items-center">
        <h3 className="text-xl uppercase font-bold mb-4">Task Name</h3>
        <h3 className="text-xl uppercase font-bold mb-4">Priority</h3>
        <h3 className="text-xl uppercase font-bold mb-4">Deadline</h3>
        <h3 className="text-xl uppercase font-bold mb-4">Action</h3>
        {pendingTasks.map( (task, index) => <div className="w-10/10 col-span-4 grid grid-cols-4 justify-items-center items-center mt-2" key={index}>
          <p className="text-xl">{task.label}</p>
          <p className="text-xl">{task.priority == 1 ? 'Top' : 'Low'}</p>
          <p className="text-xl">{task.date}</p>
          <p className="text-xl"><button className="bg-white text-red-500 border border-red-500 rounded-xl hover:bg-red-500 hover:text-white cursor-pointer w-30 h-10" onClick={ () => {
            setPendingTasks(pendingTasks.filter( (each) => each.id !== task.id ))
            setCompletedTasks([...completedTasks, {id:completedTasks.length+1, label:task.label, priority:task.priority, date:task.date}])
          } }>Mark Done</button></p>
        </div> )}
      </div>
        
      <h2 className="text-3xl place-self-start m-5">Completed Tasks</h2>
      <div className="border py-5 bg-gray-200 rounded-xl grid grid-cols-3 w-full justify-items-center mb-5">
        <h3 className="text-xl uppercase font-bold mb-4">Task Name</h3>
        <h3 className="text-xl uppercase font-bold mb-4">Priority</h3>
        <h3 className="text-xl uppercase font-bold mb-4">Deadline</h3>
        {completedTasks.map( (task, index) => <div className="w-10/10 col-span-3 grid grid-cols-3 justify-items-center items-center mt-2" key={index}>
          <p className="text-xl">{task.label}</p>
          <p className="text-xl">{task.priority == 1 ? 'Top' : 'Low'}</p>
          <p className="text-xl">{task.date}</p>
        </div> )}
      </div>

    </div>
  )
}

export default TasksScheduler;