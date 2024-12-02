import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToDoList from './ToDoList'; // Adjust the import if necessary
import { act } from 'react';

describe("ToDoList Component", () => {
  const mockUpdateTasks = jest.fn();
  const mockClose = jest.fn();

  const tasks = [
    { text: "Sample task 1", completed: false },
    { text: "Sample task 2", completed: true },
  ];

  test("renders the ToDoList component", () => {
    render(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={tasks}
        updateTasks={mockUpdateTasks}
      />
    );

    // Check if the To-Do List is open
    expect(screen.getByText("To-Do List")).toBeInTheDocument();

    // Check if tasks are displayed
    tasks.forEach((task) => {
      expect(screen.getByText(task.text)).toBeInTheDocument();
    });
  });

  test("adds a task", async () => {
    // Render the component with initial tasks
    const { rerender } = render(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={tasks}
        updateTasks={mockUpdateTasks}
      />
    );
  
    // Add a new task
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
  
    // Simulate user input and clicking "Add"
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);
  
    // Ensure updateTasks was called with the new task
    await waitFor(() => {
      expect(mockUpdateTasks).toHaveBeenCalledWith([
        ...tasks,
        { text: "New Task", completed: false },
      ]);
    });
  
    // Re-render the component with the updated tasks
    rerender(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={[...tasks, { text: "New Task", completed: false }]}
        updateTasks={mockUpdateTasks}
      />
    );
  
    // Check if the new task appears in the list
    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });
  
  test("deletes a task", async () => {
    // Render the component with initial tasks
    const { rerender } = render(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={tasks}
        updateTasks={mockUpdateTasks}
      />
    );
  
    const deleteButton = screen.getAllByText("X")[0];
  
    // Delete the first task
    fireEvent.click(deleteButton);
  
    // Ensure updateTasks is called with the updated tasks
    await waitFor(() => {
      expect(mockUpdateTasks).toHaveBeenCalledWith([
        { text: "Sample task 2", completed: true },
      ]);
    });
  
    // Re-render the component with the updated tasks (after deletion)
    rerender(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={[{ text: "Sample task 2", completed: true }]}
        updateTasks={mockUpdateTasks}
      />
    );
  
    // Ensure the deleted task is removed from the DOM
    await waitFor(() => {
      expect(screen.queryByText(tasks[0].text)).not.toBeInTheDocument();
    });
  });

  test("closes the ToDoList popup", () => {
    render(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={tasks}
        updateTasks={mockUpdateTasks}
      />
    );

    // Close the popup
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Ensure that onClose is called
    expect(mockClose).toHaveBeenCalled();
  });

  test("tasks persist after closing and reopening the ToDoList popup", () => {
    render(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={tasks}
        updateTasks={mockUpdateTasks}
      />
    );

    // Add a new task
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    // Close the popup
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Reopen the ToDoList popup
    render(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={[...tasks, { text: "New Task", completed: false }]}
        updateTasks={mockUpdateTasks}
      />
    );

    // Check if the new task persists after reopening
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("marks a task as completed", () => {
    render(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={tasks}
        updateTasks={mockUpdateTasks}
      />
    );

    const checkbox = screen.getAllByRole("checkbox")[0];

    // Mark the task as completed
    fireEvent.click(checkbox);

    // Check if updateTasks was called with the updated task
    expect(mockUpdateTasks).toHaveBeenCalledWith([
      { text: "Sample task 1", completed: true },
      { text: "Sample task 2", completed: true },
    ]);
  });

  test("unmarks a completed task", () => {
    render(
      <ToDoList
        isOpen={true}
        onClose={mockClose}
        tasks={tasks}
        updateTasks={mockUpdateTasks}
      />
    );

    const checkbox = screen.getAllByRole("checkbox")[1];

    // Unmark the completed task
    fireEvent.click(checkbox);

    // Check if updateTasks was called with the updated task
    expect(mockUpdateTasks).toHaveBeenCalledWith([
      { text: "Sample task 1", completed: false },
      { text: "Sample task 2", completed: false },
    ]);
  });
});