import React, { useState , useEffect } from "react";
import { DndContext, closestCorners, useSensor } from "@dnd-kit/core";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import TextField from '@mui/material/TextField';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  KeyboardSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

export default function ProjectList() {
  const selected_developers=[];
  const project = {
    name: "Sample Project",
    description:
      "This is a sample project description. Replace it with the actual project details.",
  };

  const [features, setFeatures] = useState([
    { id: 1, text: "abcde" },
    { id: 2, text: "efgh" },
    { id: 3, text: "ijkl" },
    { id: 4, text: "mno" },
    { id: 5, text: "pqrs" },
  ]);

  const [droppedFeatures, setDroppedFeatures] = useState([]);
  const Column = ({ features }) => {
    return (
      <div className="flex-1 p-4">
        <div className="container max-w-md border rounded bg-gray-100 mt-4">
          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <SortableContext items={features} strategy={verticalListSortingStrategy}>
            <div>
              {features.map((temp) => (
                <div key={temp.id} className="bg-blue-200 p-1 rounded mb-2">
                  <Task id={temp.id} text={temp.text} key={temp.id} />
                </div>
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    );
  };
  
  
  const DroppedBox = () => {
    return (
      <div className="flex-1 p-4">
        <div className="container max-w-md border rounded bg-gray-100 mt-4 pb-12">
          <h3 className="text-xl font-semibold mb-4">Dropped Features</h3>
          <ul>
            {droppedFeatures.map((feature) => (
              <li key={feature.id} className="bg-blue-200 p-2 rounded mb-2">
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  
  
  

  const addTask = (text) => {
    setFeatures((features) => [
      ...features,
      { id: features.length + 1, text },
    ]);
  };

  const Task = ({ id, text }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="bg-blue-200 p-2 rounded mb-2 cursor-move flex items-center"
        style={style}
      >
        <input type="checkbox" className=" hidden" />
        {text}
      </div>
    );
  };
  

  const getTaskPos = (id) =>
    features.findIndex((feature) => feature.id === id);

    const handleDragEnd = (event) => {
      const { active, over } = event;
    
      if (active.id === over.id) return;
    
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
    
      const movedFeature = features[originalPos];
    
      // Update the features array after removing the dragged feature
      setFeatures((prevFeatures) =>
        prevFeatures.filter((_, index) => index !== originalPos)
      );
    
      // Add the dragged feature to the droppedFeatures array
      setDroppedFeatures((prevDroppedFeatures) => [
        ...prevDroppedFeatures,
        movedFeature,
      ]);
    };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );




  const DeveloperDropdown = () => {
    const [selectedDevelopers, setSelectedDevelopers] = useState([]);
    const [tasks, setTasks] = useState({});
    
    // Updated developer information in JSON format
    const allDevelopers = [
      { id: 100, name: "Developer 1" },
      { id: 2, name: "Developer 2" },
      { id: 3, name: "Developer 3" },
    ];
  
    const handleSelectDeveloper = (event) => {
      setSelectedDevelopers(event.target.value);
    };
  
    const handleAddTask = (developer) => {
      const userInput = prompt('Enter task:');
      if (userInput !== null) {
        setTasks((prevTasks) => ({
          ...prevTasks,
          [developer.id]: [...(prevTasks[developer.id] || []), { id: Date.now(), task: userInput }],
        }));
      }
    };
  
    const handleRemoveTask = (developerId, taskId) => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [developerId]: prevTasks[developerId].filter((task) => task.id !== taskId),
      }));
    };
  
    useEffect(() => {
      console.log('Selected Developers:', selectedDevelopers);
      console.log('Tasks:', tasks);
    }, [selectedDevelopers, tasks]);
  
    return (
      <div className="p-4">
        <div className="w-1/4 pr-2">
          <Select
            className="w-full bg-gray-100 p-2 rounded"
            multiple
            value={selectedDevelopers}
            onChange={handleSelectDeveloper}
            renderValue={() => null}
            displayEmpty
            defaultValue=""
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 150,
                  width: 180,
                },
              },
            }}
          >
            <MenuItem disabled value="">
              <em>Select Developers</em>
            </MenuItem>
            {allDevelopers.map((developer) => (
              <MenuItem key={developer.id} value={developer}>
                <Checkbox checked={selectedDevelopers.includes(developer)} />
                <ListItemText primary={developer.name} />
              </MenuItem>
            ))}
          </Select>
        </div>
        {selectedDevelopers.map((developer) => (
          <div key={developer.id} className="items-center">
            <TextField
              label={`Tasks for ${developer.name}`}
              value={tasks[developer.id]?.map((task) => task.task).join('\n') || ''}
              multiline
              onChange={(e) => {
                const updatedTasks = e.target.value.split('\n').map((task, index) => ({
                  id: tasks[developer.id]?.[index]?.id || Date.now() + index,
                  task,
                }));
                setTasks({ ...tasks, [developer.id]: updatedTasks });
              }}
            />
            <Button variant="contained" onClick={() => handleAddTask(developer)}>
              Add Task
            </Button>
            {tasks[developer.id]?.map((task) => (
              <div key={task.id} className="flex items-center">
                <ListItemText primary={task.task} />
                <Button
                  variant="contained"
                  onClick={() => handleRemoveTask(developer.id, task.id)}
                >
                  Remove Task
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const NumberOfDaysInput = () => {
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
  
    const handleNumberOfDaysChange = (event) => {
      const days = parseInt(event.target.value, 10);
      setNumberOfDays(days);
  
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + days);
      setEndDate(newEndDate);
    };
  
    return (
      <div className="ml-5 w-1/2 flex pr-2">
        Enter Number of days of Sprint:
        <input
          type="number"
          className="w-full bg-gray-100 p-2 rounded"
          placeholder="Number of Days"
          onChange={handleNumberOfDaysChange}
          value={numberOfDays}
        />
      </div>
    );
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
        <div className="text-lg">{project.description}</div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        {/* <Input onSubmit={addTask} /> */}
        <div className="flex">
        <Column features={features} className="w-1/2" />
        <DroppedBox className="w-1/2" />
      </div>
      </DndContext>
      
      <DeveloperDropdown/>
      <NumberOfDaysInput/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >         
        Submit
      </button>
    </>
  );
}


{/* <div className="w-3/4 pl-2">
          <div className="bg-gray-100 p-4 rounded">
            {selectedDevelopers.map((developer) => (
              <div key={developer} className="">
                
                {developer}
              </div>
            ))}
          </div>
        </div> */}