import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, Plus, MoreVertical, Save, Check, Search, ArrowLeft, Filter, SortDesc, Menu } from 'lucide-react';

export default function StrongAppCloneNew() {
    const [workoutName, setWorkoutName] = useState('Upper Body A');
    const [currentPage, setCurrentPage] = useState('edit'); // 'edit', 'addExercise', or 'createExercise'
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [showDropdown, setShowDropdown] = useState(false);

    // New Exercise form fields
    const [newExerciseName, setNewExerciseName] = useState('');
    const [newExerciseMuscle, setNewExerciseMuscle] = useState('');
    const [newExerciseAction, setNewExerciseAction] = useState('');

    // Filter states
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
    const [selectedActions, setSelectedActions] = useState([]);
    const filterPopupRef = useRef(null);
    const dropdownRef = useRef(null);

    const muscleGroups = [
        'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps',
        'Quadriceps', 'Hamstrings', 'Calves', 'Abs', 'Forearms'
    ];

    const keyActions = [
        'Push', 'Pull', 'Press', 'Squat', 'Hinge',
        'Carry', 'Rotation', 'Extension', 'Flexion', 'Isolation'
    ];

    const [exercises, setExercises] = useState([
        {
            id: 1,
            name: 'Bench Press',
            sets: [
                { id: 1, previous: '135 × 8', lbs: 135, reps: 8, completed: false },
                { id: 2, previous: '135 × 8', lbs: 135, reps: 8, completed: false },
                { id: 3, previous: '135 × 8', lbs: 135, reps: 8, completed: false },
                { id: 4, previous: '135 × 8', lbs: 135, reps: 8, completed: false }
            ]
        },
        {
            id: 2,
            name: 'Pull-ups',
            sets: [
                { id: 1, previous: 'BW × 10', lbs: 0, reps: 10, completed: false },
                { id: 2, previous: 'BW × 10', lbs: 0, reps: 10, completed: false },
                { id: 3, previous: 'BW × 10', lbs: 0, reps: 10, completed: false }
            ]
        },
        {
            id: 3,
            name: 'Seated Dumbbell Press',
            sets: [
                { id: 1, previous: '35 × 10', lbs: 35, reps: 10, completed: false },
                { id: 2, previous: '35 × 10', lbs: 35, reps: 10, completed: false },
                { id: 3, previous: '35 × 10', lbs: 35, reps: 10, completed: false }
            ]
        }
    ]);

    // Exercise database with muscle groups and actions
    const [exerciseDatabase, setExerciseDatabase] = useState([
        { id: 101, name: 'Bench Press', muscle: 'Chest', action: 'Push' },
        { id: 102, name: 'Incline Bench Press', muscle: 'Upper Chest', action: 'Push' },
        { id: 103, name: 'Decline Bench Press', muscle: 'Lower Chest', action: 'Push' },
        { id: 104, name: 'Push-up', muscle: 'Chest', action: 'Push' },
        { id: 105, name: 'Dumbbell Bench Press', muscle: 'Chest', action: 'Push' },
        { id: 106, name: 'Barbell Squat', muscle: 'Quadriceps', action: 'Squat' },
        { id: 107, name: 'Deadlift', muscle: 'Back', action: 'Hinge' },
        { id: 108, name: 'Pull-up', muscle: 'Back', action: 'Pull' },
        { id: 109, name: 'Lat Pulldown', muscle: 'Back', action: 'Pull' },
        { id: 110, name: 'Overhead Press', muscle: 'Shoulders', action: 'Press' },
        { id: 111, name: 'Lateral Raise', muscle: 'Shoulders', action: 'Isolation' },
        { id: 112, name: 'Bicep Curl', muscle: 'Biceps', action: 'Flexion' },
        { id: 113, name: 'Tricep Extension', muscle: 'Triceps', action: 'Extension' },
        { id: 114, name: 'Leg Press', muscle: 'Legs', action: 'Push' },
        { id: 115, name: 'Romanian Deadlift', muscle: 'Hamstrings', action: 'Hinge' }
    ]);

    // Close filter popup when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterPopupRef.current && !filterPopupRef.current.contains(event.target)) {
                setShowFilterPopup(false);
            }

            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        if (showFilterPopup || showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilterPopup, showDropdown]);

    // Filter exercises based on search query and selected filters
    const filteredExercises = exerciseDatabase.filter(exercise => {
        // Text search filter
        const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            exercise.muscle.toLowerCase().includes(searchQuery.toLowerCase());

        // Muscle group filter
        const matchesMuscle = selectedMuscleGroups.length === 0 ||
            selectedMuscleGroups.some(group =>
                exercise.muscle.toLowerCase().includes(group.toLowerCase()));

        // Action filter
        const matchesAction = selectedActions.length === 0 ||
            selectedActions.includes(exercise.action);

        return matchesSearch && matchesMuscle && matchesAction;
    });

    // Sort and group exercises by muscle group
    const sortedExercises = [...filteredExercises].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    const exercisesByMuscle = sortedExercises.reduce((groups, exercise) => {
        if (!groups[exercise.muscle]) {
            groups[exercise.muscle] = [];
        }
        groups[exercise.muscle].push(exercise);
        return groups;
    }, {});

    const addSet = (exerciseId) => {
        setExercises(exercises.map(exercise => {
            if (exercise.id === exerciseId) {
                const newSetId = exercise.sets.length + 1;
                const lastSet = exercise.sets[exercise.sets.length - 1];
                return {
                    ...exercise,
                    sets: [
                        ...exercise.sets,
                        {
                            id: newSetId,
                            previous: lastSet ? `${lastSet.lbs} × ${lastSet.reps}` : '0 × 0',
                            lbs: lastSet ? lastSet.lbs : 0,
                            reps: lastSet ? lastSet.reps : 0,
                            completed: false
                        }
                    ]
                };
            }
            return exercise;
        }));
    };

    const updateSetValue = (exerciseId, setId, field, value) => {
        setExercises(exercises.map(exercise => {
            if (exercise.id === exerciseId) {
                return {
                    ...exercise,
                    sets: exercise.sets.map(set => {
                        if (set.id === setId) {
                            return { ...set, [field]: value };
                        }
                        return set;
                    })
                };
            }
            return exercise;
        }));
    };

    const addExerciseToWorkout = (exerciseToAdd) => {
        const newExercise = {
            id: exercises.length + 1,
            name: exerciseToAdd.name,
            sets: [
                { id: 1, previous: '0 × 0', lbs: 0, reps: 10, completed: false },
                { id: 2, previous: '0 × 0', lbs: 0, reps: 10, completed: false },
                { id: 3, previous: '0 × 0', lbs: 0, reps: 10, completed: false }
            ]
        };

        setExercises([...exercises, newExercise]);
        setCurrentPage('edit');
    };

    const toggleSetCompleted = (exerciseId, setId) => {
        setExercises(exercises.map(exercise => {
            if (exercise.id === exerciseId) {
                return {
                    ...exercise,
                    sets: exercise.sets.map(set => {
                        if (set.id === setId) {
                            return { ...set, completed: !set.completed };
                        }
                        return set;
                    })
                };
            }
            return exercise;
        }));
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const toggleMuscleGroupFilter = (muscle) => {
        if (selectedMuscleGroups.includes(muscle)) {
            setSelectedMuscleGroups(selectedMuscleGroups.filter(m => m !== muscle));
        } else {
            setSelectedMuscleGroups([...selectedMuscleGroups, muscle]);
        }
    };

    const toggleActionFilter = (action) => {
        if (selectedActions.includes(action)) {
            setSelectedActions(selectedActions.filter(a => a !== action));
        } else {
            setSelectedActions([...selectedActions, action]);
        }
    };

    const clearFilters = () => {
        setSelectedMuscleGroups([]);
        setSelectedActions([]);
    };

    const applyFilters = () => {
        setShowFilterPopup(false);
    };

    const createNewExercise = () => {
        if (newExerciseName.trim() === '') return;

        const newExercise = {
            id: Math.max(...exerciseDatabase.map(e => e.id), 0) + 1,
            name: newExerciseName,
            muscle: newExerciseMuscle || 'Other',
            action: newExerciseAction || 'Other'
        };

        setExerciseDatabase([...exerciseDatabase, newExercise]);

        // Reset form fields
        setNewExerciseName('');
        setNewExerciseMuscle('');
        setNewExerciseAction('');

        // Return to exercises page
        setCurrentPage('addExercise');
    };

    // Count total exercises that match the current filters
    const totalFilteredExercises = filteredExercises.length;

    // Edit Template Page
    const EditTemplatePage = () => (
        <>
            {/* Header */}
            <div className="bg-orange-500 text-white py-4 px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <ChevronLeft className="mr-2" />
                    <h1 className="text-xl font-bold">Edit Template</h1>
                </div>
                <div className="flex">
                    <button className="mr-4">
                        <X />
                    </button>
                    <button className="font-semibold">
                        <Save />
                    </button>
                </div>
            </div>

            {/* Workout Name */}
            <div className="bg-white p-4 mb-2 shadow-sm">
                <input
                    type="text"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    className="text-lg font-bold w-full outline-none"
                    placeholder="Workout Name"
                />
            </div>

            {/* Exercise List */}
            <div className="flex-grow overflow-auto">
                {exercises.map((exercise, index) => (
                    <div key={exercise.id} className="bg-white mb-2 shadow-sm">
                        <div className="p-4 flex justify-between items-center border-b border-gray-200">
                            <div className="font-semibold">{exercise.name}</div>
                            <MoreVertical size={18} />
                        </div>
                        <div className="px-2 py-3">
                            {/* Column Headers */}
                            <div className="flex mb-2 text-xs text-gray-500 font-medium">
                                <div className="w-1/5 text-center">SET</div>
                                <div className="w-1/5 text-center">PREVIOUS</div>
                                <div className="w-1/5 text-center">LBS</div>
                                <div className="w-1/5 text-center">REPS</div>
                                <div className="w-1/5 text-center">✓</div>
                            </div>

                            {/* Set Rows */}
                            {exercise.sets.map(set => (
                                <div key={set.id} className="flex items-center py-2 border-b border-gray-100">
                                    <div className="w-1/5 text-center font-medium">{set.id}</div>
                                    <div className="w-1/5 text-center">
                                        <input
                                            type="text"
                                            value={set.previous}
                                            onChange={(e) => updateSetValue(exercise.id, set.id, 'previous', e.target.value)}
                                            className="w-full text-center text-gray-500 border-none outline-none"
                                            style={{ appearance: 'textfield' }}
                                        />
                                    </div>
                                    <div className="w-1/5 text-center">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={set.lbs}
                                            onChange={(e) => {
                                                const value = e.target.value === '' ? 0 : parseInt(e.target.value) || 0;
                                                updateSetValue(exercise.id, set.id, 'lbs', value);
                                            }}
                                            className="w-full text-center font-medium border-none outline-none"
                                            style={{ appearance: 'textfield' }}
                                        />
                                    </div>
                                    <div className="w-1/5 text-center">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={set.reps}
                                            onChange={(e) => {
                                                const value = e.target.value === '' ? 0 : parseInt(e.target.value) || 0;
                                                updateSetValue(exercise.id, set.id, 'reps', value);
                                            }}
                                            className="w-full text-center font-medium border-none outline-none"
                                            style={{ appearance: 'textfield' }}
                                        />
                                    </div>
                                    <div className="w-1/5 flex justify-center">
                                        <button
                                            onClick={() => toggleSetCompleted(exercise.id, set.id)}
                                            className={`w-6 h-6 rounded-full flex items-center justify-center ${set.completed ? 'bg-green-500' : 'border border-gray-300'}`}
                                        >
                                            {set.completed && <Check size={14} className="text-white" />}
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add Set Button */}
                            <div className="mt-2 px-2">
                                <button
                                    onClick={() => addSet(exercise.id)}
                                    className="text-orange-500 font-medium text-sm flex items-center"
                                >
                                    <Plus size={16} className="mr-1" /> Add Set
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Exercise Button */}
            <div className="p-4">
                <button
                    onClick={() => setCurrentPage('addExercise')}
                    className="bg-orange-500 text-white w-full py-3 rounded-lg flex items-center justify-center font-semibold"
                >
                    <Plus size={20} className="mr-2" /> Add Exercise
                </button>
            </div>
        </>
    );

    // Add Exercise Page
    const AddExercisePage = () => (
        <>
            {/* Header */}
            <div className="bg-orange-500 text-white py-4 px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <button onClick={() => setCurrentPage('edit')} className="mr-2">
                        <ArrowLeft />
                    </button>
                    <h1 className="text-xl font-bold">Exercises</h1>
                </div>
                <div className="flex items-center">
                    <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="mr-4">
                        <Search size={20} />
                    </button>
                    <button onClick={() => setShowFilterPopup(true)} className="mr-4 relative">
                        <Filter size={20} />
                        {(selectedMuscleGroups.length > 0 || selectedActions.length > 0) && (
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full"></span>
                        )}
                    </button>
                    <button onClick={toggleSortOrder} className="mr-4">
                        <SortDesc size={20} className={sortOrder === 'desc' ? 'transform rotate-180' : ''} />
                    </button>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setShowDropdown(!showDropdown)}>
                            <MoreVertical size={20} />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 top-8 bg-white rounded shadow-lg py-2 z-10 w-48">
                                <button
                                    className="px-4 py-2 text-left w-full hover:bg-gray-100"
                                    onClick={() => {
                                        setCurrentPage('createExercise');
                                        setShowDropdown(false);
                                    }}
                                >
                                    Create Exercise
                                </button>
                                <button className="px-4 py-2 text-left w-full hover:bg-gray-100">
                                    Show Archived
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Bar - Only show when search is active */}
            {isSearchVisible && (
                <div className="p-4 bg-white">
                    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                        <Search size={18} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search exercises"
                            className="bg-transparent w-full outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>
            )}

            {/* Filter status bar - Show when filters are active */}
            {(selectedMuscleGroups.length > 0 || selectedActions.length > 0) && (
                <div className="bg-gray-100 p-2 flex items-center justify-between">
                    <div className="text-sm">
                        <span className="font-medium">{totalFilteredExercises} Exercises: </span>
                        {selectedMuscleGroups.length > 0 && (
                            <span className="mr-2">{selectedMuscleGroups.length} muscle groups</span>
                        )}
                        {selectedActions.length > 0 && (
                            <span>{selectedActions.length} actions</span>
                        )}
                    </div>
                    <button
                        onClick={clearFilters}
                        className="text-orange-500 text-sm font-medium"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Exercise Categories */}
            <div className="flex-grow overflow-auto">
                {Object.keys(exercisesByMuscle).map(muscle => (
                    <div key={muscle} className="mb-4">
                        <div className="px-4 py-2 bg-gray-200 font-medium text-gray-700">
                            {muscle}
                        </div>
                        <div className="bg-white">
                            {exercisesByMuscle[muscle].map(exercise => (
                                <div
                                    key={exercise.id}
                                    className="px-4 py-3 border-b border-gray-100 flex justify-between items-center"
                                    onClick={() => addExerciseToWorkout(exercise)}
                                >
                                    <div className="flex flex-col">
                                        <div>{exercise.name}</div>
                                        <div className="text-xs text-gray-500">{exercise.action}</div>
                                    </div>
                                    <Plus size={18} className="text-orange-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {Object.keys(exercisesByMuscle).length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                        No exercises match your filters
                    </div>
                )}
            </div>

            {/* Filter Popup - Modified with more space at the top */}
            {showFilterPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div
                        ref={filterPopupRef}
                        className="bg-white rounded-lg w-11/12 max-w-md max-h-5/6 overflow-hidden flex flex-col"
                    >
                        <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Filter Exercises</h2>
                            <button onClick={() => setShowFilterPopup(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Added more space (pt-5 instead of pt-0) */}
                        <div className="pt-5 px-4 pb-3">
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={clearFilters}
                                    className="text-orange-500 text-sm font-medium"
                                >
                                    Clear All
                                </button>
                                <div className="font-medium">
                                    {totalFilteredExercises} Exercises
                                </div>
                            </div>
                        </div>

                        <div className="overflow-auto px-4 pb-4 flex-grow">
                            {/* Muscle Group Filter */}
                            <div className="mb-6">
                                <h3 className="font-bold text-lg mb-2">Muscle Group</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {muscleGroups.map(muscle => (
                                        <button
                                            key={muscle}
                                            className={`p-2 rounded-lg text-left ${selectedMuscleGroups.includes(muscle)
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-100'
                                                }`}
                                            onClick={() => toggleMuscleGroupFilter(muscle)}
                                        >
                                            {muscle}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Key Action Filter */}
                            <div>
                                <h3 className="font-bold text-lg mb-2">Key Action</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {keyActions.map(action => (
                                        <button
                                            key={action}
                                            className={`p-2 rounded-lg text-left ${selectedActions.includes(action)
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-100'
                                                }`}
                                            onClick={() => toggleActionFilter(action)}
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={applyFilters}
                                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    // Create Exercise Page - New Page
    const CreateExercisePage = () => (
        <>
            {/* Header */}
            <div className="bg-orange-500 text-white py-4 px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <button onClick={() => setCurrentPage('addExercise')} className="mr-2">
                        <ArrowLeft />
                    </button>
                    <h1 className="text-xl font-bold">New Exercise</h1>
                </div>
                <div>
                    <button
                        onClick={createNewExercise}
                        className="font-semibold"
                    >
                        <Save />
                    </button>
                </div>
            </div>

            {/* Exercise Form */}
            <div className="p-4 bg-white">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Exercise Name
                    </label>
                    <input
                        type="text"
                        value={newExerciseName}
                        onChange={(e) => setNewExerciseName(e.target.value)}
                        placeholder="e.g. Cable Lateral Raise"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Primary Muscle Group
                    </label>
                    <select
                        value={newExerciseMuscle}
                        onChange={(e) => setNewExerciseMuscle(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a muscle group</option>
                        {muscleGroups.map(muscle => (
                            <option key={muscle} value={muscle}>{muscle}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Key Action
                    </label>
                    <select
                        value={newExerciseAction}
                        onChange={(e) => setNewExerciseAction(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select an action</option>
                        {keyActions.map(action => (
                            <option key={action} value={action}>{action}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex flex-col h-screen bg-gray-100 font-sans">
            {currentPage === 'edit' ? <EditTemplatePage /> :
                currentPage === 'addExercise' ? <AddExercisePage /> :
                    <CreateExercisePage />}

            {/* Bottom Navigation - Only show on Edit Template page */}
            {currentPage === 'edit' && (
                <div className="bg-white py-4 px-6 flex justify-between border-t border-gray-200">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-500">Routines</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-500">History</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-orange-500 rounded-full mb-1"></div>
                        <span className="text-xs text-orange-500">Start</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-500">Measurements</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-500">Settings</span>
                    </div>
                </div>
            )}
        </div>
    );
}