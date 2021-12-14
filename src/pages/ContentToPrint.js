function ContentToPrint() {
  const tasks = [
    {
      name: "Elmira",
      task: "clean the kitchen",
    },
    {
      name: "Omar",
      task: "buy food",
    },
    {
      name: "Bianca",
      task: "clean the living room",
    },
  ];
  const handleChange = (index) => {
    console.log(`changed task ${index}`);
  };
  return (
    <div className="card-container">
      <div className="card">
        {tasks.map((item, index) => {
          return (
            <div className="task-container" key={index} id={index}>
              <p>{item.name}</p>
              <div>
                <p>{item.task}</p>
              </div>
              <input type="checkbox" onChange={() => handleChange(index)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContentToPrint;
