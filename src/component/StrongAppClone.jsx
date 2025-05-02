import { useState } from "react";
import { Home, Clock, CalendarDays, User, Menu, Plus, ArrowLeft, X, MapPin, Shuffle, Heart, Check, Trash2 } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
// import { useNavigation } from "react-router-dom";

export default function StrongAppClone() {
    // const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState("pocketsOfTime");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [walkingOptions, setWalkingOptions] = useState([
        { distance: "1 mile", destination: "Local Park", time: "20 min" },
        { distance: "0.5 mile", destination: "Coffee Shop", time: "10 min" },
        { distance: "2 miles", destination: "Downtown", time: "40 min" }
    ]);
    const [randomWalk, setRandomWalk] = useState(null);
    const [selfCareRoutines, setSelfCareRoutines] = useState([
        { name: "Morning Meditation", notes: "Focus on breathing", todos: ["5 min meditation", "Gratitude journal", "Stretch"] }
    ]);
    const [myRoutines, setMyRoutines] = useState([
        { title: "Full Body Workout", exercises: ["Bench Press", "Squat", "Deadlift"], lastPerformed: "3 days ago" },
        { title: "Upper Body", exercises: ["Bench Press", "Overhead Press", "Pull-ups"], lastPerformed: "1 week ago" },
        { title: "Lower Body", exercises: ["Squat", "Lunges", "Leg Press"], lastPerformed: "5 days ago" }
    ]);
    const [timeRoutines, setTimeRoutines] = useState([
        { title: "Quick 15 Min HIIT", exercises: ["Jumping Jacks", "Burpees", "Mountain Climbers"], duration: "15 min" },
        { title: "30 Min Lunch Break", exercises: ["Push-ups", "Sit-ups", "Bodyweight Squats"], duration: "30 min" },
        { title: "5 Min Morning Energizer", exercises: ["Jumping Jacks", "Push-ups", "Squats"], duration: "5 min" }
    ]);
    const [templateRoutines, setTemplateRoutines] = useState([
        { title: "PPL Template", exercises: ["Push Day", "Pull Day", "Legs Day"], type: "3-day split" },
        { title: "5x5 Strength Template", exercises: ["Squat 5x5", "Bench Press 5x5", "Deadlift 5x5"], type: "Strength Building" },
        { title: "HIIT Cardio Template", exercises: ["20s Work/10s Rest", "8 Different Exercises"], type: "Cardio" }
    ]);

    const openModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const addWalkingOption = (newOption) => {
        setWalkingOptions([...walkingOptions, newOption]);
        setModalOpen(false);
    };

    const addSelfCareRoutine = (newRoutine) => {
        setSelfCareRoutines([...selfCareRoutines, newRoutine]);
        setModalOpen(false);
    };

    const getRandomWalk = () => {
        if (walkingOptions.length === 0) return;
        const randomIndex = Math.floor(Math.random() * walkingOptions.length);
        setRandomWalk(walkingOptions[randomIndex]);
        setTimeout(() => setRandomWalk(null), 5000); // Reset after 5 seconds
    };

    const deleteWalkingOption = (index) => {
        const updatedOptions = [...walkingOptions];
        updatedOptions.splice(index, 1);
        setWalkingOptions(updatedOptions);
    };

    const deleteSelfCareRoutine = (index) => {
        const updatedRoutines = [...selfCareRoutines];
        updatedRoutines.splice(index, 1);
        setSelfCareRoutines(updatedRoutines);
    };

    const deleteMyRoutine = (index) => {
        const updatedRoutines = [...myRoutines];
        updatedRoutines.splice(index, 1);
        setMyRoutines(updatedRoutines);
    };

    const deleteTimeRoutine = (index) => {
        const updatedRoutines = [...timeRoutines];
        updatedRoutines.splice(index, 1);
        setTimeRoutines(updatedRoutines);
    };

    const deleteTemplateRoutine = (index) => {
        const updatedRoutines = [...templateRoutines];
        updatedRoutines.splice(index, 1);
        setTemplateRoutines(updatedRoutines);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "myRoutines":
                return <MyRoutines openModal={openModal} routines={myRoutines} deleteRoutine={deleteMyRoutine} />;
            case "pocketsOfTime":
                return <PocketsOfTimeRoutines
                    openModal={openModal}
                    selfCareRoutines={selfCareRoutines}
                    timeRoutines={timeRoutines}
                    deleteSelfCareRoutine={deleteSelfCareRoutine}
                    deleteTimeRoutine={deleteTimeRoutine}
                />;
            case "templates":
                return <TemplateRoutines openModal={openModal} templates={templateRoutines} deleteTemplate={deleteTemplateRoutine} />;
            case "walking":
                return (
                    <WalkingOptions
                        walkingOptions={walkingOptions}
                        openModal={openModal}
                        getRandomWalk={getRandomWalk}
                        randomWalk={randomWalk}
                        deleteWalkingOption={deleteWalkingOption}
                    />
                );
            default:
                return <MyRoutines openModal={openModal} routines={myRoutines} deleteRoutine={deleteMyRoutine} />;
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Strong</h1>
                <Menu size={24} />
            </header>

            {/* Tab Navigation */}
            <div className="bg-white border-b flex flex-wrap">
                <button
                    className={`flex-1 py-3 px-2 text-xs font-medium ${activeTab === "myRoutines" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("myRoutines")}
                >
                    My Routines
                </button>
                <button
                    className={`flex-1 py-3 px-2 text-xs font-medium ${activeTab === "pocketsOfTime" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("pocketsOfTime")}
                >
                    Pockets of Time
                </button>
                <button
                    className={`flex-1 py-3 px-2 text-xs font-medium ${activeTab === "templates" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("templates")}
                >
                    Templates
                </button>
                <button
                    className={`flex-1 py-3 px-2 text-xs font-medium ${activeTab === "walking" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                    onClick={() => setActiveTab("walking")}
                >
                    Walking
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {renderContent()}
            </div>

            {/* Bottom Navigation Bar */}
            <div className="bg-white flex justify-around items-center py-3 border-t border-gray-200">
                <div className="flex flex-col items-center text-gray-500">
                    <Home size={20} />
                    <span className="text-xs mt-1">Home</span>
                </div>
                <div className="flex flex-col items-center text-blue-600">
                    <CalendarDays size={20} />
                    <span className="text-xs mt-1">Routines</span>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                    <Clock size={20} />
                    <span className="text-xs mt-1">Progress</span>
                </div>
                <div className="flex flex-col items-center text-gray-500">
                    <User size={20} />
                    <span className="text-xs mt-1">Profile</span>
                </div>
            </div>

            {/* Add Button */}
            <button
                className="absolute bottom-20 right-4 bg-blue-600 p-3 rounded-full text-white shadow-lg"
                onClick={() => openModal(activeTab === "walking" ? "new-walk" : "new")}
            >
                <Plus size={24} />
            </button>

            {/* Self-Care Button (only on Pockets of Time tab) */}
            {activeTab === "pocketsOfTime" && (
                <button
                    className="absolute bottom-40 right-4 bg-pink-500 p-3 rounded-full text-white shadow-lg"
                    onClick={() => openModal("new-self-care")}
                >
                    <Heart size={24} />
                </button>
            )}

            {/* Modal */}
            {modalOpen && (
                <Modal
                    modalContent={modalContent}
                    setModalOpen={setModalOpen}
                    addWalkingOption={addWalkingOption}
                    addSelfCareRoutine={addSelfCareRoutine}
                />
            )}
        </div>
    );
}

// Modal Component
function Modal({ modalContent, setModalOpen, addWalkingOption, addSelfCareRoutine }) {
    const [walkDetails, setWalkDetails] = useState({
        distance: "",
        destination: "",
        time: ""
    });

    const [selfCareDetails, setSelfCareDetails] = useState({
        name: "",
        notes: "",
        todos: [""]
    });

    const handleAddWalk = () => {
        addWalkingOption(walkDetails);
    };

    const handleAddSelfCare = () => {
        addSelfCareRoutine(selfCareDetails);
    };

    const addTodoItem = () => {
        setSelfCareDetails({
            ...selfCareDetails,
            todos: [...selfCareDetails.todos, ""]
        });
    };

    const updateTodoItem = (index, value) => {
        const updatedTodos = [...selfCareDetails.todos];
        updatedTodos[index] = value;
        setSelfCareDetails({
            ...selfCareDetails,
            todos: updatedTodos
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 max-w-md">
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={() => setModalOpen(false)} className="mr-2">
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-lg font-medium">
                            {modalContent === "new" && "Create New Routine"}
                            {modalContent === "new-walk" && "Add Walking Option"}
                            {modalContent === "new-self-care" && "Add Self-Care Routine"}
                            {modalContent !== "new" && modalContent !== "new-walk" && modalContent !== "new-self-care" && "Routine Details"}
                        </h2>
                    </div>
                    <button onClick={() => setModalOpen(false)}>
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4">
                    {modalContent === "new" && <NewRoutineForm />}
                    {modalContent === "new-walk" && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Distance</label>
                                <input
                                    className="w-full border rounded p-2"
                                    placeholder="e.g., 1 mile"
                                    value={walkDetails.distance}
                                    onChange={(e) => setWalkDetails({ ...walkDetails, distance: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Destination</label>
                                <input
                                    className="w-full border rounded p-2"
                                    placeholder="e.g., Local Park"
                                    value={walkDetails.destination}
                                    onChange={(e) => setWalkDetails({ ...walkDetails, destination: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Estimated Time</label>
                                <input
                                    className="w-full border rounded p-2"
                                    placeholder="e.g., 20 min"
                                    value={walkDetails.time}
                                    onChange={(e) => setWalkDetails({ ...walkDetails, time: e.target.value })}
                                />
                            </div>
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded w-full"
                                onClick={handleAddWalk}
                            >
                                Add Walking Option
                            </button>
                        </div>
                    )}
                    {modalContent === "new-self-care" && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Routine Name</label>
                                <input
                                    className="w-full border rounded p-2"
                                    placeholder="e.g., Evening Mindfulness"
                                    value={selfCareDetails.name}
                                    onChange={(e) => setSelfCareDetails({ ...selfCareDetails, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Notes</label>
                                <textarea
                                    className="w-full border rounded p-2 h-20"
                                    placeholder="Add any notes about this self-care routine..."
                                    value={selfCareDetails.notes}
                                    onChange={(e) => setSelfCareDetails({ ...selfCareDetails, notes: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">To-Do List</label>
                                <div className="space-y-2">
                                    {selfCareDetails.todos.map((todo, index) => (
                                        <div key={index} className="flex items-center">
                                            <Check size={16} className="text-gray-400 mr-2" />
                                            <input
                                                className="w-full border rounded p-2"
                                                placeholder="e.g., 10 minutes of deep breathing"
                                                value={todo}
                                                onChange={(e) => updateTodoItem(index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="mt-2 text-blue-600 text-sm flex items-center"
                                    onClick={addTodoItem}
                                >
                                    <Plus size={16} className="mr-1" /> Add item
                                </button>
                            </div>
                            <button
                                className="bg-pink-500 text-white py-2 px-4 rounded w-full"
                                onClick={handleAddSelfCare}
                            >
                                Save Self-Care Routine
                            </button>
                        </div>
                    )}
                    {modalContent !== "new" && modalContent !== "new-walk" && modalContent !== "new-self-care" && <RoutineDetails title={modalContent} />}
                </div>
            </div>
        </div>
    );
}

// New Routine Form Component
function NewRoutineForm() {
    return (
        <div>
            <input
                className="w-full border rounded p-2 mb-4"
                placeholder="Routine Name"
            />
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Routine Type</label>
                <select className="w-full border rounded p-2">
                    <option>My Routines</option>
                    <option>Pockets of Time</option>
                    <option>Template</option>
                </select>
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded w-full">
                Create Routine
            </button>
        </div>
    );
}

// Routine Details Component
function RoutineDetails({ title }) {
    return (
        <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">Created on: April 22, 2025</p>
            <div className="border rounded-lg p-3 mb-3">
                <div className="flex justify-between mb-2">
                    <span className="font-medium">Squat</span>
                    <span>3 sets</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>8-10 reps</span>
                    <span>225 lbs</span>
                </div>
            </div>
            <div className="border rounded-lg p-3 mb-3">
                <div className="flex justify-between mb-2">
                    <span className="font-medium">Bench Press</span>
                    <span>3 sets</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>8-10 reps</span>
                    <span>185 lbs</span>
                </div>
            </div>
            <button className="bg-green-600 text-white py-2 px-4 rounded w-full">
                Start Workout
            </button>
        </div>
    );
}

// Self-Care Routine Card Component
function SelfCareCard({ routine, index, onDelete }) {
    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent card click event
        onDelete(index);
    };

    return (
        <div className="bg-pink-50 border border-pink-200 rounded-lg shadow p-4 relative">
            <button
                className="absolute top-2 right-2 p-1 bg-pink-100 rounded-full hover:bg-pink-200"
                onClick={handleDelete}
            >
                <Trash2 size={14} className="text-pink-600" />
            </button>

            <div className="flex items-center mb-2">
                <Heart size={16} className="text-pink-500 mr-2" />
                <h3 className="font-bold text-pink-700">{routine.name}</h3>
            </div>

            {routine.notes && (
                <div className="mb-3 text-sm text-gray-600 italic">
                    "{routine.notes}"
                </div>
            )}

            <div className="space-y-1">
                {routine.todos.map((todo, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                        <Check size={14} className="text-pink-500 mr-2" />
                        <span>{todo}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Walking Options Component
function WalkingOptions({ walkingOptions, openModal, getRandomWalk, randomWalk, deleteWalkingOption }) {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Walking Options</h2>
                <button
                    className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-lg"
                    onClick={getRandomWalk}
                >
                    <Shuffle size={16} className="mr-1" />
                    <span>Random Walk</span>
                </button>
            </div>

            {/* Random Walk Suggestion */}
            {randomWalk && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4 flex items-start">
                    <MapPin className="text-green-600 mr-3 mt-1" size={20} />
                    <div>
                        <div className="font-bold text-green-800">Today's Random Walk:</div>
                        <div className="font-medium">{randomWalk.destination}</div>
                        <div className="text-sm text-gray-700">
                            {randomWalk.distance} • Approx. {randomWalk.time}
                        </div>
                    </div>
                </div>
            )}

            {/* <div className="space-y-3">
                {walkingOptions.map((option, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4 flex items-start relative">
                        <button
                            className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                            onClick={() => deleteWalkingOption(index)}
                        >
                            <Trash2 size={14} className="text-gray-600" />
                        </button>
                        <MapPin className="text-blue-600 mr-3 mt-1" size={20} />
                        <div>
                            <div className="font-bold">{option.destination}</div>
                            <div className="text-sm text-gray-600">
                                {option.distance} • Approx. {option.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}

            <div className="text-center text-gray-500 mt-4 text-sm">
                Tap the + button to add a new walking option
            </div>
        </div>
    );
}

// My Routines Section
function MyRoutines({ openModal, routines, deleteRoutine }) {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">My Routines</h2>
            <div className="space-y-3">
                {routines.map((routine, index) => (
                    <RoutineCard
                        key={index}
                        title={routine.title}
                        exercises={routine.exercises}
                        lastPerformed={routine.lastPerformed}
                        onClick={() => openModal(routine.title)}
                        onDelete={() => deleteRoutine(index)}
                    />
                ))}
            </div>
        </div>
    );
}

// Pockets of Time Routines Section
function PocketsOfTimeRoutines({ openModal, selfCareRoutines, timeRoutines, deleteSelfCareRoutine, deleteTimeRoutine }) {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Pockets of Time Routines</h2>

            {/* Fitness Routines */}
            <div className="space-y-3 mb-6">
                {timeRoutines.map((routine, index) => (
                    <RoutineCard
                        key={index}
                        title={routine.title}
                        exercises={routine.exercises}
                        duration={routine.duration}
                        onClick={() => openModal(routine.title)}
                        onDelete={() => deleteTimeRoutine(index)}
                    />
                ))}
            </div>

            {/* Self-Care Section */}
            {selfCareRoutines.length > 0 && (
                <>
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                        <Heart size={18} className="text-pink-500 mr-2" />
                        Self-Care Routines
                    </h2>
                    <div className="space-y-3">
                        {selfCareRoutines.map((routine, index) => (
                            <SelfCareCard
                                key={index}
                                routine={routine}
                                index={index}
                                onDelete={deleteSelfCareRoutine}
                            />
                        ))}
                    </div>
                </>
            )}
            <div className="text-center text-pink-500 mt-4 text-sm">
                Tap the heart button to add a new self-care routine
            </div>
        </div>
    );
}

// Template Routines Section
function TemplateRoutines({ openModal, templates, deleteTemplate }) {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Template Routines</h2>
            <div className="space-y-3">
                {templates.map((template, index) => (
                    <RoutineCard
                        key={index}
                        title={template.title}
                        exercises={template.exercises}
                        type={template.type}
                        onClick={() => openModal(template.title)}
                        onDelete={() => deleteTemplate(index)}
                    />
                ))}
            </div>
        </div>
    );
}

// Reusable Routine Card Component
function RoutineCard({ title, exercises, lastPerformed, duration, type, onClick, onDelete }) {
    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent card click from opening modal
        onDelete();
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 relative" onClick={onClick}>
            <div>
                <button
                    className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                    onClick={handleDelete}
                >
                    <Trash2 size={14} className="text-gray-600" />
                </button>
                <button
                    className="absolute top-10 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                    onClick={() => navigation.navigate("StrongAppCloneNew")}
                >
                    <BsThreeDots />
                </button>
            </div>

            <h3 className="font-bold mb-2 pr-6">{title}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
                {exercises.map((exercise, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                        {exercise}
                    </span>
                ))}
            </div>
            <div className="text-sm text-gray-500">
                {lastPerformed && <div>Last performed: {lastPerformed}</div>}
                {duration && <div>Duration: {duration}</div>}
                {type && <div>Type: {type}</div>}
            </div>
        </div>
    );
}
